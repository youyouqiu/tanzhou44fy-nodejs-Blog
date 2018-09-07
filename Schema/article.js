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




module.exports = ArticleSchema;

