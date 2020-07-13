const mongoose = require('mongoose');

const Product = require('./models/product');

const createProduct = async function (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
};

exports.createProduct = createProduct;