// 生成文章的 Schema

const { Schema } = require("./config");
// 获取 Schema 的 id 值类型
const ObjectId = Schema.Types.ObjectId;

const ArticleSchema = new Schema({
    title: String,
    content: String,
    author: {
        type: ObjectId,
        ref: "users"
    }, // 关联 users 表，连表查询
    tips: String,
    commentNum: Number, // 计数字段，用来存储计数数据
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
},  {
        timestamps: {
            createdAt: "createTime", // 创建时间
            updateAt: "updateTime" // 更新时间
        }
    }
);

// 设置 article 的 remove 钩子
ArticleSchema.post("remove", doc => {
    const Comment = require("../Models/comment"); // 钩子内部导入评论和用户模块
    const User = require("../Models/user");
    const { _id: artId, author: authorId } = doc; // 文章 id 和文章作者 id
    
    User
        .findByIdAndUpdate(authorId, {$inc: {articleNum: -1}})
        .exec()

    // 当前需要删除文章的所有关联评论，依次调用 comment 钩子的 remove
    Comment
        .find({article: artId})
        .then(data => {
            data.forEach(v => v.remove())
        })
})



module.exports = ArticleSchema;

