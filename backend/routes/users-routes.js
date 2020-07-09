const express = require('express');

const placesControllers = require("../controllers/users-controller");

const router = express.Router();

router.get('/',usersController.getUsers);

router.post('/signup', usersController.signup);

router.post('/login', usersController.login);

module.exports = router;