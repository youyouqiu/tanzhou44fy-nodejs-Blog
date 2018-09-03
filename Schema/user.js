// 生成用户的Schema
const { Schema } = require("./config.js");

const UserSchema = new Schema({
    username: String,
    password: String,
});





module.exports = UserSchema;


