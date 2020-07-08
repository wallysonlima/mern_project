const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    res.json({message: 'It works'});
    console.log('GET Request in Places');
});