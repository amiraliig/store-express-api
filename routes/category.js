const express = require("express");
const router = express.Router();


const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly")
const asyncHandler = require("../middleware/asyncHandler");


const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require("../controllers/category");


router.get("/", asyncHandler(getCategories));


router.post("/", auth, adminOnly, asyncHandler(createCategory));
router.put("/:id", auth, adminOnly, asyncHandler(updateCategory));
router.delete("/:id", auth, adminOnly, asyncHandler(deleteCategory));

module.exports = router;