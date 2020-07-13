const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const mongoPractice = require('./mongoose');

const app = express();

const mongoPractice = require('./mongo');

app.use(bodyParser.urlencoded({extend: false})); 

app.post('/products', mongoPractice.createProduct);

app.get('/products', mongoPractice.getProducts);

app.listen(5000);