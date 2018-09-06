// 用户注册，登录相关路由设置
// 数据判断
// 数据库读写操作

const { db } = require("../Schema/config");
const ArticleSchema = require("../Schema/article");

// 通过 db 对象创建操作 article 数据库的模型对象
const Article = db.model("Articles", ArticleSchema);

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
    data.author = ctx.session.username; // 文章发布时，发布页面 post 过来的数据没有作者信息，手动扩展添加文章的作者

    // 查询，判断数据是否出错，并返回相应状态
    await new Promise((res, rej) => {
        new Article(data).save((err, data) => {
            if (err) return rej(err);
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

