const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");
const Product = require("../models/product");

// Get products by search engine
const productsGet = async (req, res = response) => {
    const filters = req.query;

    if (filters.limit) {
        const { limit, skip = 0 } = req.query;
        const query = { status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .limit(Number(limit))
                .skip(Number(skip))
                .sort({ createdAt: -1 })
        ]);

        res.json({
            total,
            products
        });
    }
    else {
        // Access to products array
        const productsFiltered = await Product.find(filters);

        // Find filtered products
        const products = productsFiltered.filter(product => {
            let isValid = true;
            for (const key in filters) {
                try{
                    if (key == 'gender') {
                        filters[key].map(gender => {
                            if (gender == product[key]) {
                                isValid = true;
                            }
                        }, product[key]);
                    }
                }catch(error){
                    
                }
                if (key == "color") {
                    product[key].map(color => {
                        if (color == filters[key]) {
                            return isValid = true;
                        }
                    }, filters[key]);
                }
                if (key == 'category') {
                    if (product[key] == filters[key]) {
                        return isValid = true;
                    }
                    else {
                        return isValid = false;
                    }
                }
                if (key == 'size') {
                    product[key].map(size => {
                        if (size == filters[key]) {
                            return isValid = true;
                        }
                    }, filters[key]);
                }
            }
            return isValid;
        })
        const total = products.length;

        res.json({
            total,
            products
        });
    }
};

// Get an specific product
const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)

    res.json(product);
};

// Post a new product
const productPost = async (req, res) => {
    const product = new Product(req.body);

    const type = "products";

    // Upload file to cloudinary
    if (req.files?.picture) {
        const result = await uploadFile(req.files.picture.tempFilePath, type);
        product.picture = result.url;
    }

    // Validate if the gender is valid to save the product
    if (validateGender(product.gender)) {
        await product.save();
        res.json({
            product,
        });
    }
    // Show an error and don't save the product
    else {
        return res.status(400).json({
            msg: "Invalid gender"
        });
    }
};

// Put an existing product
const productPut = async (req, res = response) => {
    const { id } = req.params;
    const newProduct = { ...req.body };

    // Validate if the gender is valid to save the product
    if (validateGender(product.gender)) {
        const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, { new: true });
        res.json(updatedProduct);
    }
    // Show an error and don't save the product
    else {
        return res.status(400).json({
            msg: "Invalid gender"
        });
    }
};

// Set product status to unavailable
const productDelete = async (req, res = response) => {
    const { id } = req.params;
    const unabledProduct = await Product.findByIdAndUpdate(id, { available: false });

    res.json(unabledProduct);
};

//Helper functions
const validateGender = (gender) => {
    if (gender == "Masculino" || gender == "Femenino" || gender == "Unisex") {
        return true;
    }
    return false;
}

module.exports = {
    productsGet,
    getProduct,
    productPost,
    productPut,
    productDelete,
};
