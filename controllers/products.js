const Product = require('../models/product')

const getAllProds = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({nbHits: products.length, products})
}

const getAllProdsStatic = (req, res) => {
    res.status(200).json({msg: 'testing NOOOO'})
}
module.exports = {
    getAllProds,
    getAllProdsStatic
}