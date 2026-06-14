const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const adminOnly = require("../middleware/adminOnly")
const asyncHandler = require("../middleware/asyncHandler")
const { createOrder, getAllOrders, getMyOrders } = require("../controllers/orders")
router.post("/", auth, asyncHandler(createOrder))
router.get("/myorders", auth, asyncHandler(getMyOrders));
router.get("/admin/all", auth, adminOnly, asyncHandler(getAllOrders));

module.exports = router
