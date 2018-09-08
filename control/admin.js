// 后台管理相关路由设置
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

exports.index = async ctx => {
    if (ctx.session.isNew){
        // 用户未登录
        ctx.status = 404;
        return await ctx.render("404.pug", {
            title: "404"
        })
    }

    // 用户已登录
    const id = ctx.params.id;
    
}

