// 评论的关联钩子

const { db } = require("../Schema/config");
const CommentSchema = require("../Schema/comment");

// 通过 db 对象创建操作 user 数据库的模型对象
const Comment = db.model("comments", CommentSchema);



module.exports = Comment;

