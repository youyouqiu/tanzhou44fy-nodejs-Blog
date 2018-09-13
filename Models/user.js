// 用户的关联钩子

const { db } = require("../Schema/config");
const UserSchema = require("../Schema/user");

// 通过 db 对象创建操作 user 数据库的模型对象
const User = db.model("users", UserSchema);



module.exports = User;

