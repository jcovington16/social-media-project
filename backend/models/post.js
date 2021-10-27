const mongoose = require('mongoose');
const Joi = require('joi');

const postSchema = new mongoose.Schema({
    text: {type: String, required: true, minlength: 5, maxlength: 500},
    timeStamp: {type: Date, default: Date.now()},
});

const Post = monogoose.model('Post', postSchema);


function validatePost(post) {
    const schema = Joi.object({
        text: Joi.string().required().min(5).max(500),
    });
    return schema.validate(post)
};

exports.Post = Post;
exports.validatePost = validatePost;