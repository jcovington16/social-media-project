const {Post, validatePost} = require('../models/post');
const {User} = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// We need to be able to grab the post based on the user_id
//router.get()
router.get("/:_id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params._id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})



router.post('/:_id/posts/', async(req,res) => {
    try {
        const{error} = validatePost(req.body);
        if (error){
            return res.status(400).send(error)
        }
        const user = await User.findById(req.params._id);
        const post = new Post({
            
            text: req.body.text,
            timeStamp: req.body.timeStamp
        });
        user.posts.push(post);
        await user.save();
        return res.send(user.posts)
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//delete a post 

router.delete('/:_id', async(req, res) =>{
    try{
        const post = await Post.findById(req.params._id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json('the post has been deleted')
        }else{
            res.status(403).json('you can only delete your post');
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//like/dislike a post 

router.put("/:_id/like", async(req,res) =>{
    try{
        const post = await Post.findById(req.params._id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: { likes: req.body.userId }});
            res.status(200).json("the post has been liked")
        }else{
        await post.updateOne({$pull:{likes:req.body.userId}});
        res.status(200).json('the post has been disliked')
        }
    }catch(err){
        res.status(500).json(err);
    }
});


//get all post from friends
router.get("/:_id/friends/post", async(req,res) =>{
    try{
        const user = await User.findById(req.params._id);
        const friendsList = await Promise.all(
            user.friends.map((friendId) => {
                return Post.find({userId: friendId._id});
            })
        );
        return res.json(friendsList.concat(...friendsList))
    }catch(err){
        return res.status(500).json(`ERROR : ${err}`);
    }
});



module.exports = router;