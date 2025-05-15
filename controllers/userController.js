const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc Register a user
//@route POST /api/users/register
//@access Public
const registerUser=asyncHandler (async (req, res) => {
    // Handle user registration logic here
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error('User already registered');
    } 
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    }else{
        res.status(400);
        throw new Error('User data is not valid');
    }
    
});

//@desc Login a user
//@route POST /api/users/login  
//@access Public
const loginUser=asyncHandler (async (req, res) => {
    const { email,password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.name,
                email:user.email,
                id:user.id,
            }
        },process.env.JWT_SECRET,
        {
            expiresIn:'15M'});  
        res.status(200).json({ accessToken });
        }else{
            res.status(401);
            throw new Error('Email or password is not valid');
        }
    
    // Handle user login logic here
    
});

//@desc Get current user
//@route POST /api/users/current
//@access Private
const getCurrentUser=asyncHandler (async (req, res) => {
    // Handle fetching current user logic here
    res.status(200).json(req.user);
});

module.exports = { registerUser , loginUser, getCurrentUser };
// This code defines a function registerUser that handles user registration logic. It uses async/await syntax to handle asynchronous operations and sends a JSON response with a success message and a 201 status code when the user is registered successfully. The function is then exported for use in other parts of the application.