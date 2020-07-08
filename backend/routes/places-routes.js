const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) >= {
    console.log('Get Request in Places');
    res.send({message: 'It works!'});
});