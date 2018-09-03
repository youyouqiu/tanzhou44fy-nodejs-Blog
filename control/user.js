// 控制数据库读写操作
const { db } = require("../Schema/config");
const UserSchema = require("../Schema/user");
const encrypt = require("../util/encrypt");

// 通过db对象创建操作user数据库的模型对象
const User = db.model("users", UserSchema);

// 用户注册路由
exports.reg = async (ctx) => {
    // 用户注册时post发过来的数据
    const user = ctx.request.body;
    const username = user.username;
    const password = user.password;
    
    // 注册时，先去数据库user查询当前发过来的username是否存在
    await new Promise((res, rej) => {
        // 查询users数据库
        User.find({username}, (err, data) => {
            // 查询数据库是否出错
            if (err) return rej(err);
            // 查询数据库是否有数据
            if (data.length !== 0){
                // 查询到数据，表示用户名已经存在
                return res("");
            } 
            // 用户名不存在，需要存储到数据库
            // 使用加密模块，对用户密码进行加密
            const _user = new User({
                username,
                password: encrypt(password)
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
            await ctx.render("isOK", {
                status: "注册成功"
            })
        } else {
            // 用户名已存在
            await ctx.render("isOK", {
                status: "用户名已存在"
            })
        }
    })
    .catch(async err => {
        await ctx.render("isOK", {
            status: "注册失败，请重新注册"
        })
    })



}





