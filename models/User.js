const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        // 🔒 اضافه کردن ولیدیشن برای فرمت استاندارد ایمیل
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    // 🏡 رابطه یک‌به‌چند از نوع Embedded برای آدرس‌ها
    // یک کاربر می‌تواند چند آدرس (خانه، محل کار) داشته باشد
    addresses: [
        {
            title: { type: String, default: "Home" }, // مثلا: خانه، شرکت
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            fullAddress: { type: String, required: true }
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)