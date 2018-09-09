// 后台管理相关路由设置
// 数据判断
// 数据库读写操作

const { db } = require("../Schema/config");
const ArticleSchema = require("../Schema/article");
const UserSchema = require("../Schema/user");
const CommentSchema = require("../Schema/comment");
const fs = require("fs");
const { join } = require("path");

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
    // 匹配所有后台页面，以便后期扩展
    const arr = fs.readdirSync(join(__dirname, "../views/admin"));
    let flag = false;
    arr.forEach(v => {
        if (v.replace(/^(admin\-)|(\.pug)$/g, "") === id){
            flag = true;
        }
    });
    if (flag){
        // 页面存在
        await ctx.render("./admin/admin-" + id, {
            role: ctx.session.role
        })
    } else {
        // 页面不存在
        ctx.status = 404;
        await ctx.render("404.pug", {
            title: "404"
        })
    }
}

