const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async function(req, res, next) {
    let users;
    
    try {
        users = await User.find({}, '-password');
    } catch( err ) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }

    res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = function(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return next(
             new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    
    const{ name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = User.findOne({ email: email });
    } catch ( err ) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );

        return next(error);
    } 

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.personare.com.br%2Fo-que-significa-sonhar-com-leao-m48714&psig=AOvVaw345FEMWGfHC9DUVs4mvq52&ust=1594811606431000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjX06zOzOoCFQAAAAAdAAAAABAD',
        password,
        places: []
    });

    try {
        await createdUser.save();
    } catch ( err ) {
        const error = new HttpError(
            'Sign up failed, please try again.',
            500
        );

        return next(error);
    }

    res.status(201).json({user: createdUser.toObject({getters: true})});
};



 const login = async function(req, res, next) {
    const{ email, password } = req.body;

    let existingUser;

    try {
        existingUser = User.findOne({ email: email });
    } catch ( err ) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );

        return next(error);
    } 

    if ( !existingUser || existingUser.password !== password ) {
        const error = new HttpError(
            'Invalid credentials, could no log in.',
            401
        );
    }

    res.json({message: 'Logged in!'});
 };

 exports.getUsers = getUsers;
 exports.signup = signup;
 exports.login = login;