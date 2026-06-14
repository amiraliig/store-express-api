const Product = require("../models/Product");

const getProducts = async (req, res) => {
    const products = await Product.find();

    res.json(products);


};
const getProduct = async (req, res) => {
    const productId = req.params.id;


    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);


};
const deleteProduct = async (req, res) => {
    const productId = req.params.id

    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }
    res.json({ message: "Product deleted" })

}

const postProduct = async (req, res) => {
    const { name, price, description, stock, images, category } = req.body;

    if (!name || !price || !description || stock === undefined || !category) {
        return res.status(400).json({
            message: "Name, price, description, stock and category are required"
        });
    }

    if (!Array.isArray(images) || images.length === 0) {
        return res.status(400).json({
            message: "At least one image URL is required"
        });
    }

    const product = await Product.create({
        name,
        price,
        description,
        stock,
        images,
        category
    });

    res.status(201).json(product);
};

const updateProduct = async (req, res) => {
    const productId = req.params.id
    const body = req.body

    const product = await Product.findByIdAndUpdate(productId, body, { new: true, runValidators: true })

    if (!product) {
        return res.status(404).json({ message: "Product not found" })
    }
    res.json(product)
}



module.exports = { getProducts, postProduct, getProduct, updateProduct, deleteProduct }