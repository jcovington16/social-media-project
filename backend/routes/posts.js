const {Post, validatePost} = require('../models/post');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// We need to be able to grab the post based on the user_id
//router.get()


router.post('/:_id/posts/', auth, async(req,res) => {
    try {
        const{error} = validatePost(req.body);
        if (error){
            return res.status(400).send(error)
        }

        const post = new Post({
            text: req.body.text,
            timeStamp: req.body.timeStamp
        });
        await post.save();
        return res.send(post)
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;