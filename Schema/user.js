// 生成用户的 Schema

const { Schema } = require("./config");

const UserSchema = new Schema({
    username: String,
    password: String,
    city: String
});





module.exports = UserSchema;





