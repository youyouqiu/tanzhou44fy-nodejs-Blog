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




module.exports = CommentSchema;

