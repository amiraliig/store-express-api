const Order = require("../models/Order")
const Product = require("../models/Product");

const createOrder = async (req, res) => {
    const { items } = req.body

    if (!items || items.length == 0) {
        return res.status(400).json({ success: false, message: "Your cart is empty" });
    }

    let orderItems = []
    let totalAmount = 0
    for (const item of items) {
        const product = await Product.findById(item.product)
        if (!product) {
            return res.status(404).json({ success: false, message: `Product not found with id: ${item.product}` });
        }
        if (product.stock < item.quantity) {
            return res.status(400).json({
                success: false,
                message: `Not enough stock for ${product.name}. Only ${product.stock} left.`
            });
        }
        const priceAtPurchase = product.price;
        totalAmount += priceAtPurchase * item.quantity;
        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            priceAtPurchase: priceAtPurchase
        });
        product.stock -= item.quantity;
        await product.save();

    }
    const order = await Order.create({
        user: req.user.id,
        items: orderItems,
        totalAmount: totalAmount,
        status: "Processing"
    })
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order
    });
}

const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
        .populate("items.product", "name price");
    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });
}


const getAllOrders = async (req, res) => {
   
    const orders = await Order.find()
        .populate("user", "name email")
        .populate("items.product", "name");

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });
};



module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders
};