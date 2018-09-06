// 生成文章的 Schema

const { Schema } = require("./config");

const ArticleSchema = new Schema({
    title: String,
    content: String,
    author: String,
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

