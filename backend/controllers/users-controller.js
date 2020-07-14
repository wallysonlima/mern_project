const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Shwarz',
        email: 'test@test.com',
        password: 'testers'
    }
];

const getUsers = function(req, res, next) {
    res.json({ users: DUMMY_USERS });
};

const signup = function(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    
    const{ name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = User.findOne({ email: email });
    } catch ( err ) {
        const error = new HttpError(
            'Signing up failed, please trye again later.',
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
        places
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



 const login = function(req, res, next) {
    const{ email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 404); 
    }

    res.json({message: 'Logged in!'});
 };

 exports.getUsers = getUsers;
 exports.signup = signup;
 exports.login = login;