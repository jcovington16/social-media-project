const {User, validateUser} = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/listOfFriends/:_id/', auth, async (req, res) => {
    try{
        const activeFriends = await User.find({listOfFriends:req.params._id})
        return res.send(activeFriends);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
});

router.get('/listOfRequests/:_id/', auth, async (req, res) => {
    try{
        const frinedRequests = await User.find({listOfRequests:req.params._id})
        return res.send(frinedRequests);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
});

router.get('/requestedList/:_id/', auth, async (req, res) => {
    try{
        const requestedFriends = await User.find({requestedList:req.params._id})
        return res.send(requestedFriends);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
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

module.exports = router;