const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const adminOnly = require("../middleware/adminOnly")

const asyncHandler = require("../middleware/asyncHandler")
const { getProducts, postProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/products")
router.get("/", asyncHandler(getProducts))
router.get("/:id", asyncHandler(getProduct))
router.post("/", auth, adminOnly, asyncHandler(postProduct))
router.put("/:id", auth, adminOnly, asyncHandler(updateProduct))
router.delete("/:id", auth, adminOnly, asyncHandler(deleteProduct))


module.exports = router