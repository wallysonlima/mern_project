const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connnect('')
.then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});



const createProduct = async function (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });

    const result = await createdProduct.save();
};

exports.createProduct = createProduct;