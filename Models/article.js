// 文章的关联钩子

const { db } = require("../Schema/config");
const ArticleSchema = require("../Schema/article");

// 通过 db 对象创建操作 user 数据库的模型对象
const Article = db.model("articles", ArticleSchema);



module.exports = Article;

