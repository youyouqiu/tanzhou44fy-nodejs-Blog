// 生成文章评论的 Schema

const { Schema } = require("./config");
// 获取 Schema 的 id 值类型
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    content: String,
    from: {
        type: ObjectId,
        ref: "users"
    }, // 关联 users 表，连表查询
    article: {
        type: ObjectId,
        ref: "articles"
    }, // 关联 articles 表
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

// 设置 comment 的 remove 钩子（钩子是原型方法，只能在文档的实例调用上触发）
CommentSchema.post("remove", doc => {
    // 钩子的回调函数，会在 remove 事件执行之前触发
    const Article = require("../Models/article"); // 钩子内部导入评论和用户模块
    const User = require("../Models/user");
    const { from, article } = doc; // 文章作者 id 和文章 id

    Article
        .updateOne({_id: article}, {$inc: {commentNum: -1}})
        .exec();

    User
        .updateOne({_id: from}, {$inc: {commentNum: -1}})
        .exec()
})



module.exports = CommentSchema;

