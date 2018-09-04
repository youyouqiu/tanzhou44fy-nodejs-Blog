// 路由配置文件

// 导入依赖模块 (中间件)
const Router = require("koa-router"); // 路由管理模块
const user = require("../control/user"); // 拿到操作 user 表的逻辑对象

// 生成router实例
const router = new Router();

// 主页
router.get("/", user.keepLog, async ctx => {
    await ctx.render("index.pug", {
        // session: {
        //     role: 0,
        //     username: "风屿大帅比"
        // },
        title: "潭州论坛首页"
    })
});

// 用户注册，登录 
// 设置动态路由，正则断言判断 user/ 后面的值，排除此两种访问外的所有非法访问，防止危险访问
/*
    router.get("/user/:id", async (ctx) => {
        ctx.body = ctx.params.id;
    })
*/
router.get(/^\/user\/(?=reg|login)/, async ctx => {
    // 用户注册登录界面的三目判断，show 为 true 显示注册页面， false 显示登录页面
    const show = /reg$/.test(ctx.path);
    await ctx.render("register", {show});
});

// 处理用户注册 路由 post
router.post("/user/reg", user.reg);

// 处理用户登录 post
router.post("/user/login", user.login);

// 

// Html子页面
router.get("/html", async ctx => {
    await ctx.render("html.pug", {
        session: {
            role: 999,
            username: "风屿大帅比"
        },
        title: "潭州论坛-Html"
    })
});



// 导出router
module.exports = router;











