const {User, validateUser} = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/', async (req,res) => {
    const users = await User.find();
        if(!users)
        return res.status(400).send('No Users');
        return res.send(users);
    });




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

   router.put("/:_id/follow", async (req, res) => {
       if(req.body.userId !== req.params._id){
           try{
               const user = await User.findById(req.params._id);
               const currentUser = await User.findById(req.body.userId);
               if(!user.followers.includes(req.body.userId)){
                    await user.updateOne({$push: {listOfRequests: req.body.userId}});
                    await currentUser.updateOne({$push: {listOfFriends: req.body.userId}});
                    res.status(200).json("user has sent friend request");
               }else{
                   res.status(403).json('you are already friends with this user')
               }
           }catch(err){
               res.status(500).json(err);
           }
       }else{
           res.status(403).json("you can't send yourself a friend request");
       }
   });

   //

module.exports = router;