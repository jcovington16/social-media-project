const mongoose = require('mongoose');
const Joi = require('joi');

const friendsSchema = new mongoose.Schema({
    activeFriends: {type: [], default: 0},
    pendingFriends: {type: [], default: 0},
    requestedFriends: {type: [], default: 0}
})