const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  pfpCharacters,
  pfpColors,
} = require('../constants/pfpOptions');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isEmailFree = await User.findOne({email});
    
    if(isEmailFree) {
      res.status(400).json({message: 'Email already in use'})
      return;
    }

    const isUsernameFree = await User.findOne({username});
    
    if(isUsernameFree) {
      res.status(400).json({message: 'Username has already been taken'})
      return;
    }

    hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      pfpColor: pfpColors[Math.floor(Math.random() * (18 + 1))],
      pfpCharacter: pfpCharacters[Math.floor(Math.random() * (37 + 1))],
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ message: 'User successfully registered', token });
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({
        message: 'Error occurred while registering user',
        error: error.message,
      });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `Could not find user with email '${email}'` });
    }

    const pwMatch = await bcrypt.compare(password, user.password);

    if (!pwMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
