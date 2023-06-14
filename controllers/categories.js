const {uploadFile} = require("../helpers/upload-file");
const {deleteFile} = require("../helpers/delete-file");
const Category = require("../models/category");

// Get all categories
const categoriesGet = async (req, res) => {
    const query = { status: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
    ]);

    res.json({
        total,
        categories,
    });
};

// Get an specific category
const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    res.json(category);
};

// Post a new category
const categoryPost = async (req, res) => {
    const { name } = req.body;
    const categoryDB = await Category.findOne({name: name});

    if (categoryDB) {
        return res.status(400).json({
            msg: `Category: ${categoryDB.name}, already exists`,
        });
    }
    else{
        const category = new Category(req.body);
        const type = "categories";

        // Upload file to cloudinary
        if(req.files?.picture){
            const result = await uploadFile(req.files.picture.tempFilePath, type);
            category.picture = result.url;
        }

        await category.save();
        res.json({
            category,
        });
    }
};

// Put an specific category
const categoryPut = async (req, res) => {
    const { id } = req.params;
    const newCategory = {...req.body};
    const type = "categories";

    // Upload file to cloudinary
    if(req.files?.picture){
        const result = await uploadFile(req.files.picture.tempFilePath, type);
        newCategory.picture = result.url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, newCategory , {new: true});
    res.json(updatedCategory);
};

// Delete an specific category
const categoryDelete = async (req, res) => {
    const { id } = req.params;
    // Delete category from database
    const categoryDB = await Category.findByIdAndDelete(id);
    res.json(categoryDB);
};

module.exports = {
    categoriesGet,
    getCategory,
    categoryPost,
    categoryPut,
    categoryDelete,
};
