const express = require('express');
const userRouter = express.Router();
const User = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authValidation = require('../../middleware/authValidation');

userRouter.post('/signup', async (req, res) => {
  const { fullName, email, password, gender, photoURL } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
      gender,
      photoURL
    });

    const data = await newUser.save();

    res.status(200).json({
      data,
      message: 'New user added successfully!!'
    });

  } catch (error) {
    console.error("Signup Error:", error); 
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message
    });
  }
});


userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { _id: user._id },
      "AMAN", 
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, 
      expires: new Date(Date.now() + 60 * 60 * 1000) 
    });

    res.status(200).json({
      data: user,
      message: 'Login successful!!'
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message
    });
  }
});

userRouter.get('/profile/view', authValidation, (req, res) => {
  try {
    const loginUser = req.user;
    const data = loginUser;

    res.status(201).json({
      data : data,
      message : 'profile fetched successfully!!'
    })
  } catch (error) {
    console.log(error);
    
  }
})

userRouter.post('/logout', authValidation, async (req, res) => {
    try {
      res.cookie('token', null, {
        httpOnly: true,
        expires: new Date(0), 
        sameSite: 'lax', 
        secure: false 
      });
  
      res.status(200).json({
        message: 'Logout successfully!!'
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Something went wrong!!',
        error: error.message
      });
    }
  });
  


module.exports = userRouter;
