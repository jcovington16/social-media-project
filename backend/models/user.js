const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const {Post, validatePost, postSchema} = require('../models/post');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 500},
    email: { type: String, unique: true, required: true, minlength: 5, maxlength: 30 },
    username: {type: String, unique: true, required: true, minlength: 5, maxlength: 15},
    password: { type: String, required: true, maxlength: 1024, minlength: 5 },
    friends: {type: [], default: [] },
    friendRequests: {type: [], default: []},
    dateJoined: {type: Date, default: Date.now()},
    online: {type: Boolean, default: false},
    posts: {type: [postSchema], default: []},
    profileImg: {type: String},
    profileBio:{type: String },
    location: {type:String}
})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id: this._id, name: this.name}, config.get('jwtSecret'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(30).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        username: Joi.string().min(5).max(15)
    });
    return schema.validate(user)
}

exports.User = User;
exports.validateUser = validateUser;