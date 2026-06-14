const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true, // نباید دوتا دسته بندی به نام "دیجیتال" داشته باشیم
        trim: true,
        maxlength: [32, "Category name is too long"]
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);