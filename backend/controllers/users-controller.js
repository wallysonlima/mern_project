const bytesToUuid = require("uuid/lib/bytesToUuid");

const HttpError = require('../models/http-error');

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

const signup = function (req, res, next) {
    const{name, email, password} = req.body;
};

const createdUser = {
    id: uuid(),
    name,
    email,
    password
};

DUMMY_USERS.push(createdUser); 

res.status(201).json({user: createdUser});

 const login = function (req, res, next) {
    const{email, password} = req.body;

    const identifiedUSer = DUMMY_USERS
        .find(u => u.email === email && u.password === password);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 404); 
    }

    res.json({message: 'Logged in!'});
 };

 exports.getUsers = getUsers;
 exports.signup = signup;
 exports.login = login;