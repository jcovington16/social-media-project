const mongoose = require('mongoose');
const Joi = require('joi');

const postSchema = new mongoose.Schema({
    // userId: {type: String, required: true},
    text: {type: String, required: true, minlength: 5, maxlength: 500},
    likes: {type: Array, default: []},
    timeStamp: {type: Date, default: Date.now()},
});

const Post = mongoose.model('Post', postSchema);


function validatePost(post) {
    const schema = Joi.object({
        // userId: Joi.string().required(),
        text: Joi.string().required().min(5).max(500),
    });
    return schema.validate(post)
};

exports.Post = Post;
exports.postSchema = postSchema;
exports.validatePost = validatePost;