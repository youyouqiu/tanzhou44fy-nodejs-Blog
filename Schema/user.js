// 生成用户的 Schema

const { Schema } = require("./config");

const UserSchema = new Schema({
    username: String,
    password: String,
    city: String,
    role: {
        type: String,
        default: 1
    },
    avatar: {
        type: String,
        default: "/avatar/name1.jpg"
    },
    articleNum: Number,
    commentNum: Number
});




module.exports = UserSchema;

