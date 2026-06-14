const Category = require("../models/Category");

// 📁 ۱. ساخت دسته‌بندی جدید (فقط ادمین)
const createCategory = async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: "Category name is required" });
    }

    // ترفند ارشد: ساخت خودکار slug از روی name
    // فاصله‌ها را تبدیل به خط تیره (-) می‌کنیم و حروف را کوچک می‌کنیم
    const slug = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "") // حذف کاراکترهای عجیب
        .replace(/\s+/g, "-");       // تبدیل فاصله‌ها به -

    const category = await Category.create({
        name,
        slug,
        description
    });

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category
    });
};

// 📜 ۲. گرفتن همه دسته‌بندی‌ها (عمومی)
const getCategories = async (req, res) => {
    const categories = await Category.find();

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
};

// ✏️ ۳. ویرایش دسته‌بندی (فقط ادمین)
const updateCategory = async (req, res) => {
    const { name, description } = req.body;
    let updateData = { description };

    // اگر ادمین نام دسته‌بندی را عوض کرد، باید اسلاگ جدید هم براش بسازیم
    if (name) {
        updateData.name = name;
        updateData.slug = name
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, "")
            .replace(/\s+/g, "-");
    }

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true } // ترفندی که قبلاً یاد گرفتی!
    );

    if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category
    });
};

// 🗑️ ۴. حذف دسته‌بندی (فقط ادمین)
const deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
};

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};