// commentModel.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    category:{type:String,required:true},
    name: { type: String, required: true },
    message: { type: String, required: true },
    likeCount: { type: Number, default: 0 }
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
