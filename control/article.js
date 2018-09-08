// 用户文章相关路由设置
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

// 文章发表页面
exports.addPage = async ctx => {
    await ctx.render("add-article", {
        session: ctx.session,
        title: "Html文章发布"
    })
}

// 文章写入，确认后保存到数据库
exports.add = async ctx => {
    if (ctx.session.isNew){
        // 值为 true，代表用户未登录
        return ctx.body = {
            status: 0,
            msg: "您未登录，请登录后再发布文章"
        }
    }
    // 用户登录的情况
    const data = ctx.request.body; // 用户登录后，post 文章发布页面发过来的数据
    // 需要拿到的数据：title，content，author，tips
    data.author = ctx.session.uid; // 文章发布时，发布页面 post 过来的数据没有作者信息，手动扩展添加文章的作者
    // 初始评论数
    data.commentNum = 0;

    // 查询，判断数据是否出错，并返回相应状态
    await new Promise((res, rej) => {
        new Article(data).save((err, data) => {
            if (err) return rej(err);
            // 更新用户的文章计数值
            User.update({_id: data.author}, {$inc: {articleNum: 1}}, err => {
                if (err) return console.log(err); 
            });
            res(data);
        })
    })
    .then(data => {
        ctx.body = {
            status: 1,
            msg: "发布成功"
        }
    })
    .catch(err => {
        ctx.body = {
            status: 0,
            msg: "发布失败"
        }
    })
}

// 获取文章列表
exports.getList = async ctx => {
    // 查询每篇文章对应的作者头像

    // 获取 page 分页的路由值 id
    let page = ctx.params.id || 1;
    page--;

    // 获取最大文章数
    const maxNum = await Article.estimatedDocumentCount((err, num) => {
        err ? console.log(err) : num;
    });

    // mongodb 原子操作
    const data = await Article
        .find()
        .sort("-createTime") // 排序方式 +升序 -降序
        .skip(6 * page) // 每页跳过多少条数据
        .limit(6) // 筛选多少条数据放入页面
        .populate({
            path: "author",
            select: "_id username avatar"
        }) // 用于 mongodb 连表查询
        .then(data => data)
        .catch(err => {
            console.log(err);
        });
    
    await ctx.render("html.pug", {
        session: ctx.session,
        artList: data,
        maxNum,
        title: "潭州论坛-Html"
    })
}

// 文章详情页
exports.details = async ctx => {
    // 获取动态路由里的 id 值
    const _id = ctx.params.id;

    // 查找文章自身数据
    const article = await Article
        .findById(_id)
        .populate({
            path: "author",
            select: "username"
        })
        .then(data => data);

    // 查找跟文章关联的所有评论
    const comment = await Comment
        .find({article: _id})
        .sort("-createTime")
        .populate({
            path: "from",
            select: "username avatar"
        })
        .then(data => data)
        .catch(err => {
            console.log(err);
        });

    await ctx.render("article", {
        article,
        comment,
        session: ctx.session,
        title: "文章详情页"
    })
}

