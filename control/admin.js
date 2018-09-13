// 后台管理相关路由设置
// 数据判断
// 数据库读写操作

// 导入钩子模块
const Article = require("../Models/article");
const Comment = require("../Models/comment");
const User = require("../Models/user");

const fs = require("fs");
const { join } = require("path");

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

