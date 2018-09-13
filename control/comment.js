// 用户评论相关路由设置
// 数据判断
// 数据库读写操作

// 导入钩子模块
const Article = require("../Models/article");
const Comment = require("../Models/comment");
const User = require("../Models/user");

// 评论添加
exports.save = async ctx => {
    let message = {
        status: 0,
        msg: "请登录后再发表评论"
    }
    // 验证用户是否登录
    if (ctx.session.isNew) return ctx.body = message;
    
    // 用户登录时，保存其评论内容
    const data = ctx.request.body;
    data.from = ctx.session.uid;
    const _comment = new Comment(data);
    await _comment
        .save()
        .then(data => {
            message = {
                status: 1,
                msg: "评论成功"
            }

            // 更新当前文章的评论计数器
            Article
                .update({_id: data.article}, {$inc:{commentNum: 1}}, err => {
                    if (err) return console.log(err);
                    console.log("评论计数器更新成功");
                })
            
            // 更新用户的评论计数器
            User.update({_id: data.from}, {$inc: {commentNum: 1}}, err => {
                if (err) return console.log(err);
            })
        })
        .catch(err => {
            message = {
                status: 0,
                msg: err
            }
        });
    
    ctx.body = message;
}

// 后台功能：查询用户所有的评论
exports.comlist = async ctx => {
    const uid = ctx.session.uid;

    // 查询用户的文章和标题
    const data = await Comment.find({from: uid}).populate("article", "title");

    // 返回data数据（以及前两个layui规定格式的数据）
    ctx.body = {
        code: 0,
        count: data.length,
        data
    }

}

// 后台功能：删除当前用户的对应评论
exports.del = async ctx => {
    const commentId = ctx.params.id;

    let res = {
        state: 1,
        message: "删除成功"
    }
    
    // 使用 Schema 钩子函数方法
    await Comment
        .findById(commentId)
        .then(data => data.remove())
        .catch(err => {
            res = {
                state: 0,
                message: "删除失败"
            }
        });

    ctx.body = res;

    // 普通方法
    /*
        let articleId, uid;

        // 查询文章 id 和用户 id
        await Comment.findById({_id: commentId}, (err, data) => {
            // 失败时状态为false
            if (err){
                return console.log(err);
            } else {
                // 获取文章 id 和用户 id
                articleId = data.article;
                uid = data.from;
            }
        });

        // 删除对应用户的评论
        await Comment
            .deleteOne({_id: commentId})
            .then(data => {
                message = {
                    state: 1,
                    message: "删除成功"
                }
                // 删除评论时，对应的文章评论数减1
                Article
                .updateOne({_id: articleId}, {$inc: {commentNum: -1}}, err => {
                    if (err) return console.log(err);
                    console.log("评论计数器更新成功");
                    
                });
                // 对应的用户评论数减1
                User
                .updateOne({_id: uid}, {$inc: {commentNum: -1}}, err => {
                    if (err) return console.log(err);
                    
                });
            })
            .catch(err => {
                message = {
                    state: 0,
                    message: err
                }
            });       
        
        ctx.body = message;
    */
}

