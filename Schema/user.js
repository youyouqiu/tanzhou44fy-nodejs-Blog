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

// 设置 user 的 remove 钩子
UserSchema.post("remove", doc => {
    const Comment = require("../Models/comment"); // 钩子内部导入评论和文章模块
    const Article = require("../Models/article");
    const { _id } = doc; // 用户id
    
    // 当前需要删除用户的所有文章，依次调用 article 钩子的 remove
    const article = Article
        .find({author: _id})
        .then(data => {
            data.forEach(v => v.remove());
        })

    // 当前需要删除用户的所有残余关联评论，依次调用 comment 钩子的 remove
    const comment = Comment
        .find({from: _id})
        .then(data => {
            data.forEach(v => v.remove())
        });
});



module.exports = UserSchema;

