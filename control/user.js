// 用户注册，登录相关路由设置
// 数据判断
// 数据库读写操作

const { db } = require("../Schema/config");
const UserSchema = require("../Schema/user");
const encrypt = require("../util/encrypt");

// 通过 db 对象创建操作 user 数据库的模型对象
const User = db.model("users", UserSchema);

// 用户注册 路由
exports.reg = async ctx => {
    // 用户注册时 post 发过来的数据
    const user = ctx.request.body;
    const username = user.username;
    const password = user.password;
    const city = user.city;

    console.log(user);
    
    // 注册时，先去数据库 user 查询当前发过来的 username 是否存在
    await new Promise((res, rej) => {
        // 查询 users 数据库
        User.find({username}, (err, data) => {
            // 查询数据库是否出错
            if (err) return rej(err);
            // 查询数据库是否有数据
            if (data.length !== 0){
                // 查询到数据，表示用户名已经存在
                return res("");
            } 
            // 用户名不存在，需要存储到数据库
            // 使用自定义加密模块 encrypt 对用户密码进行加密
            const _user = new User({
                username,
                password: encrypt(password),
                city
            });

            _user.save((err, data) => {
                if (err){
                    rej(err);
                } else {
                    res(data);
                }
            })
        })
    })
    .then(async data => {
        if (data){
            // 注册成功
            await ctx.render("isOK.pug", {
                status: "注册成功",
                title: "注册成功"
            })
        } else {
            // 用户名已存在
            await ctx.render("isOK.pug", {
                status: "用户名已存在",
                title: "注册失败"
            })
        }
    })
    .catch(async err => {
        await ctx.render("isOK.pug", {
            status: "注册失败，请重试",
            title: "注册失败"
        })
    })
}

// 用户登录 路由
exports.login = async ctx => {
    // 拿到 post 数据
    const user = ctx.request.body;
    const username = user.username;
    const password = user.password;
    const city = user.city;

    console.log(user);

    // 登录时，先去数据库 user 查询当前发过来的 username 是否存在
    await new Promise((res, rej) => {
        // 查询 users 数据库
        User.find({username}, (err, data) => {
            // 查询数据库是否出错
            if (err) return rej(err);
            // 查询数据库是否有数据
            if (data.length === 0){
                // 查询不到数据，表示用户名未注册
                return rej("用户名不存在");
            }
            // password 比对，把用户传过来的密码加密后和数据库的加密密码比对
            if (data[0].password === encrypt(password) && data[0].city === city){
                // 密码相同
                return res(data);
            }
            // 密码不同
            res("");
        })
    })
    .then(async data => {
        if (!data){
            return ctx.render("isOK.pug", {
                status: "数据不正确，登录失败",
                title: "登录失败"
            })
        }
        // 设置用户 cookie 值，用户的信息
        ctx.cookies.set("username", username, {
            domain: "localhost",
            path: "/",
            maxAge: 36e5,
            httpOnly: true, // 是否不让客户端访问这个 cookie
            overwrite: false,
            signed: true
        });

        // 用户在数据库的 id 值
        ctx.cookies.set("uid", data[0]._id, {
            domain: "localhost",
            path: "/",
            maxAge: 36e5,
            httpOnly: true,
            overwrite: false,
            signed: true
        });

        // 后端的 session 值，记录用户数据
        ctx.session = {
            username,
            uid: data[0]._id,
            avatar: data[0].avatar
        }

        // 登录成功
        await ctx.render("isOK.pug", {
            status: "登录成功",
            title: "登录成功"
        })
    })
    .catch(async err => {
        await ctx.render("isOK.pug", {
            status: err,
            title: "登录失败"
        })
    })
}

// 判断确定用户状态，保持用户状态
exports.keepLog = async (ctx, next) => {
    if (ctx.session.isNew){ // 当 session 里没有保存任何数据的时候，isNew 为 true
        if (ctx.cookies.get("username")){
            ctx.session = {
                username: ctx.cookies.get("username"),
                uid: ctx.cookies.get("uid")
            }
        }
    }
    await next();
}

// 用户退出
exports.logout = async ctx => {
    // 清空session
    ctx.session = null;
    // 清空cookies，并把失效时间改为即时失效 0
    ctx.cookies.set("username", null, {
        maxAge: 0
    });
    ctx.cookies.set("uid", null, {
        maxAge: 0
    });
    // 在后台设置重定向到根目录
    ctx.redirect("/");
}

