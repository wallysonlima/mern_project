const MongoClient = require('mongodb').MongoClient;

const createProduct =  async function (req, res, next) {
    const newProduct = {
        name: req.body.name, 
        price: req.body.price
    };

    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db();
        const result = (await db.collection('product').insertOne(newProduct));
    } catch(error) {
        return res.json({message: 'Could not store data.'});
    };

    client.close();
    res.json(newProduct);
};

const getProducts = async function(req, res, next) {
    const client = new MongoClient(url);

    let products;

    try {
        await client.connect();
        const db = client.db();
        const products = await db.collection('products').find().toArray();
    } catch (error) {
        return res.json({message: 'Could no retrieve products.'});
    }
    client.close();

    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;