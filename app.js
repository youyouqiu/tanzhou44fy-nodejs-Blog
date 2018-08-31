// 导入依赖模块
const Koa = require("koa");
const static = require("koa-static");
const views = require("koa-views");
const logger = require("koa-logger");
const { join } = require("path");
// router
const router = require("./routers/router");
// 生成koa实例
const app = new Koa();

// 注册日志模块
app.use(logger());
// 配置静态资源目录
app.use(static(join(__dirname, "public")));
// 配置视图模板
app.use(views(join(__dirname, "views"), {
    extension: "pug"
}));





// 注册路由信息
app.use(router.routes()).use(router.allowedMethods());
app.listen(3003, () => {
    console.log("Node实战项目启动成功，监听在localhost:3003端口");
})


