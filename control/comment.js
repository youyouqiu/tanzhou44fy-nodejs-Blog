// 用户评论相关路由设置
// 数据判断
// 数据库读写操作

const { db } = require("../Schema/config");
const ArticleSchema = require("../Schema/article");
const UserSchema = require("../Schema/user");
const CommentSchema = require("../Schema/comment");

// 通过 db 对象创建操作 article 数据库的模型对象
const Article = db.model("Articles", ArticleSchema);
const User = db.model("users", UserSchema);
const Comment = db.model("comments", CommentSchema);

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

