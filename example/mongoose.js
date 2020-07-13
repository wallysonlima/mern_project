const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connnect('mongodb+srv://manu:KyOP1JrHoErqQILt@cluster0-g8eu9.mongodb.net/products_test?retryWrites=true&w=majority')
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

    console.log(createdProduct);
    const result = await createdProduct.save();

    res.json(result);
};

const getProducts = async function (req, res, next) {
    const products = await Product.find().exec();
    console.log(typeof createdProduct.id);
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;