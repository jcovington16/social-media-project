const {User, validateUser} = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoos = require('mongoose');
const multer = require('multer');
const uuidv4 = require('uuid');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLocaleLowerCase.split(' ').join('-');
        cb(null, uuidv4() + '-' + filename)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, and .jpeg format allowed!'));
        }
    }
});

// router.post('/:_id/profileImage', upload.single('profileImg'), (req, res, next) => {
//     const url = req.protocol + '://' + req.get('host')
//     const user = await User.findById(
// })


router.get('/:id/profile', async (req,res) => {
    const user = await User.findById(req.params.id);
        if(!user)
        return res.status(400).send('No Users');
        return res.send(user);
    });

router.get('/', async (req,res) => {
    const users = await User.find();
    if(!users){
        return res.status(400).send('No Users');
    } else {
        return res.send(users);
    } 
    
});


router.put('/:id/profile', async (req, res) => {
    try {
    const user = await User.findByIdAndUpdate(req.params.id,
    {
    profileImg: req.body.profileImg,
    profileBio:req.body.profileBio,
    location: req.body.location
    },
    { new: true }
    );
    if (!user)
    return res.status(400).send(`The user with id "${req.params.id}" d
    oes not exist.`);
    await user.save();
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
    });


// TODO: Make a put route for all of the different list of friends. Will get to this soon.

router.put('/:_id/requestedList/', async (req, res) => {
    try{
        const requestedFriends = await User.find({requestedList:req.params._id})
        //Dot notation
        return res.send(requestedFriends);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
});

// TODO: Create a delete route

router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        const salt = await bcrypt.genSalt(10);
        user = new User({
          name: req.body.name,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, salt),
          username: req.body.username,
    });

        await user.save();

        const token = user.generateAuthToken();

        return res
            .header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token')
            .send({ _id: user._id, name: user.name, email: user.email });
           

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

    // get friend info
router.get("/:_id/friends", async (req, res) => {
    const user = await User.findById(req.params._id);
    try {
        return res.send(user.friends);
    } catch(err) {
        return res.send(`Error: ${err}`)
    }

    
});

router.get("/:_id/requests", async(req, res) => {
    const user = await User.findById(req.params._id);
    return res.send(user.friendRequests)
});


   //send friend request

router.put("/:_id/friends", async (req, res) => {
    if(req.body.userId !== req.params._id){
        try{
            const user = await User.findById(req.params._id);
            const friend = await User.findById(req.body.userId);

            if(!user.friends.includes(req.body.userId)){
                await user.updateOne({$push: {friendRequests: {name:friend.name, id: friend._id}}});

                return res.status(200).json("user has sent friend request");
            }if(user.friendsRequests.includes(friend.name)){
                return res.status(403).json("you already sent a friend request to user")
            }
            else{
                return res.status(403).json('you are already friends with this user')
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("you can't send yourself a friend request");
    }
});

   //accept friend request
router.put("/:_id/accept", async (req, res) => {
    if(req.body.userId !== req.params._id){
        try{
            const user = await User.findById(req.params._id);
            const requester = await User.findById(req.body.userId);
            if(!user.friends.includes(requester)){
                await user.updateOne({$push: {friends: {name: requester.name, id: requester._id}}});
                await user.updateOne({$pull: {friendRequests: {name: requester.name, id: requester.name}}});
                await requester.updateOne({$push: {friends: {name: user.name, id: user._id}}});
                return res.status(200).json("accepted friend request")
            }
            else{
                return res.status(403).json("you are already friends");
            }
        }catch(err){
        return res.status(500).json(`Error: ${err}`);
        }
    }
});


router.delete("/:_id/friends", async(req, res) => {
    if(req.body.userId != req.params._id) {
        try{
            const user = await User.findById(req.params._id);
            const friend = await User.findById(req.body.userId);
        
            if(user.friends.includes(req.body.userId)){
            await user.updateOne({$pull: {friends: {name: friend.name, id: friend._id}}});
            await friend.updateOne({$pull: {friends: {name: user.name, id: user._id}}});
            return res.status(200).json("You've successfully removed friend");
            } else {
                return res.status(403).json("User is not in your friends list.");
            }

        } catch(err) {
            return res.status(500).json(err);
        }
    }
})

router.delete("/:_id/requests", async(req, res) => {
    if(req.body.userId != req.params._id) {
        try {
            const user = await User.findById(req.params._id);
            const requester = await User.findById(req.body.userId);

            if(user.friendRequests.includes(req.body.userId) || (user.friendRequests.includes(requester))) {
                await user.updateOne({$pull: {friendRequests: req.body.userId}})
                return res.status(200).json("You've successfully removed request");
            } else {
                return res.status(403).json("User is not in your pending request");
            }

        } catch(err) {
            return res.status(500).json(err);
        }
    }
})

module.exports = router;