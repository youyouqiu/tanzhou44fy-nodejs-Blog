// node 实战项目入口文件

// 导入依赖模块 (中间件)
const Koa = require("koa");
const static = require("koa-static"); // 静态文件管理模块
const views = require("koa-views"); // 视图渲染模块
const logger = require("koa-logger"); // 运行日志模块
const body = require("koa-body"); // 内容解析模块
const session = require("koa-session"); // 后台缓存管理模块
const compress = require("koa-compress"); // 代码压缩模块
const { join } = require("path");

// 导入 routerjs
const router = require("./routers/router");
// 生成 koa 实例
const app = new Koa;

app.keys = ["风屿是个大帅比"]

// session 的配置对象
const CONFIG = {
    key: "Sid", // 签名
    maxAge: 36e5, // 失效时间 3600000 毫秒
    overwrite: true, // 是否覆盖
    httpOnly: true, // 对 http 是否不可见
    signed: true, // 是否签名，不设置或为 true 时，自动签名
    rolling: true // 是否开始新操作后刷新
}

// 注册代码压缩模块
app.use(compress({ // 配置文件
    // filter(content_type){
    //     return /text/i.test(content_type);
    // },
    threshold: 2048,
    flush: require("zlib").Z_SYNC_FLUSH
}));

// 注册日志模块
// app.use(logger());

// 注册 session 模块
app.use(session(CONFIG, app)); // 参数 （配置对象，挂载对象）

// 配置 koa-body 处理 post 请求数据
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
});

// 创建管理员用户，如果管理员用户已经存在，则返回，默认admin admin
{
    const { db } = require("./Schema/config");
    const UserSchema = require("./Schema/user");
    const encrypt = require("./util/encrypt");

    // 通过 db 对象创建操作 user 数据库的模型对象
    const User = db.model("users", UserSchema);

    // 查询管理员是否存在
    User
        .find({username: "admin"})
        .then(data => {
            if (data.length === 0){
                // 管理员不存在，创建
                new User({
                    username: "admin",
                    password: encrypt("admin"),
                    city: "0",
                    role: 666,
                    articleNum: 0,
                    commentNum: 0
                })
                .save()
                .then(data => {
                    console.log("管理员账号 -> admin，密码 -> admin");
                })
                .catch(err => {
                    console.log("管理员账号查询失败")
                })
            } else {
                // 管理员存在，返回
                console.log("管理员账号 -> admin，密码 -> admin");
            }
        })
}

