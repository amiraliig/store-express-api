const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "نام محصول اجباری است"], // پیغام خطای اختصاصی
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        required: [true, "توضیحات محصول اجباری است"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "قیمت محصول اجباری است"],
        min: [0, "Price cannot be negative"]
    },
    // تغییر دادیم به تعداد موجودی عددی
    stock: {
        type: Number,
        required: [true, "موجودی انبار اجباری است"],
        min: [0, "موجودی نمی‌تواند منفی باشد"],
        default: 0
    },
    // آرایه‌ای از آدرس عکس‌های محصول
    images: [
        { type: String, required: true }
    ],
    // 🔗 اتصال محصول به دسته‌بندی (رابطه یک‌به‌چند)
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "محصول باید متعلق به یک دسته‌بندی باشد"]
    }
}, { timestamps: true }) // حتماً timestamps را اضافه کن تا زمان ثبت محصول را داشته باشی

module.exports = mongoose.model("Product", productSchema)