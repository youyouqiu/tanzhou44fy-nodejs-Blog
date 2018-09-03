// node实战项目入口文件

// 导入依赖模块(中间件)
const Koa = require("koa");
const static = require("koa-static"); // 静态文件管理模块
const views = require("koa-views"); // 视图渲染模块
const logger = require("koa-logger"); // 运行日志模块
const body = require("koa-body"); // 内容解析模块
const session = require("koa-session"); // 后台缓存管理模块
const { join } = require("path");
// 导入routerjs
const router = require("./routers/router");
// 生成koa实例
const app = new Koa();

// 注册日志模块
app.use(logger());

// 配置koa-body处理post请求数据
app.use(body());

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



