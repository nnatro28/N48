const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        res.status(200).send('Login successful');
    } catch (error) {
        res.send(error.message);
    }

});

module.exports = router;