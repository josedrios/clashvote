const User = require('../models/User');

exports.addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
