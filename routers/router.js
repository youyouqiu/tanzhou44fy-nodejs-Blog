// 路由配置文件

// 导入依赖模块
const Router = require("koa-router");
// 生成router实例
const router = new Router();

// 主页
router.get("/", async (ctx) => {
    await ctx.render("index.pug", {
        session: {
            role: 999
        },
        title: "潭州论坛首页"
    })
});

// 用户注册，登录
router.get(/^\/user\/(?=reg|login)/, async (ctx) => {
    const show = /reg$/.test(ctx.path);
    await ctx.render("register", {show});
});

// Html子页面
router.get("/html", async (ctx) => {
    await ctx.render("html.pug", {
        session: {
            role: 999
        },
        title: "潭州论坛-Html"
    })
});



// 导出router
module.exports = router;











