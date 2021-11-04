const {User, validateUser} = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const bcrypt = require('bcrypt');
const { request } = require('express');


router.get('/', async (req,res) => {
    const users = await User.find();
        if(!users)
        return res.status(400).send('No Users');
        return res.send(users);
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

router.put('/:_id/requestedList/', auth, async (req, res) => {
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

   //send friend request

   router.put("/:_id/friends", async (req, res) => {
       if(req.body.userId !== req.params._id){
           try{
               const user = await User.findById(req.params._id);

               if(!user.friends.includes(req.body.userId)){
                    await user.updateOne({$push: {friendRequests: req.body.userId}});

                    return res.status(200).json("user has sent friend request");
               }if(user.friends.includes(friendRequest[userId])){
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
               if(!user.friends.includes(req.body.userId)){
                   await user.updateOne({$push: {friends: req.body.userId}});
                   await user.updateOne({$pull: {friendRequests: req.body.userId}});
                   await requester.updateOne({$push: {friends: req.params._id}});
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
                await user.updateOne({$pull: {friends: req.body.userId}});
                await friend.updateOne({$pull: {friends: req.params._id}});
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

               if(user.friendRequests.includes(req.body.userId)) {
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