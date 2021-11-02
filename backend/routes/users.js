const {User, validateUser} = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const bcrypt = require('bcrypt');

// TODO: Make a put route for all of the different list of friends. Will get to this soon.
router.get('/:_id/listOfFriends/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.params._id);
        const userFriends = user.listOfFriends
        
        return res.send(userFriends);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
});

router.get('/:_id/listOfRequests/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.params._id);
        const listRequest = user.listOfRequests
        
        return res.send(listRequest);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
});

router.get('/:_id/requestedList/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.params._id);
        const requestedFriends = user.requestedList
        
        return res.send(requestedFriends);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
});

router.put('/:_id/listOfRequests/user_id', async (req, res) => {
    try {
        const user = await User.findById(req.params._id);
        const friend = await User.findById(req.params.user_id);

        user.listOfFriends.push(friend);
        await user.save();
        return res.send(user.listOfFriends);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
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

module.exports = router;