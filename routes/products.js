const { Router } = require("express");
const { check } = require("express-validator");

// Import middlewares
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

// Import controllers
const {
    productsGet,
    getProduct,
    productPost,
    productPut,
    productDelete,
} = require("../controllers/products");

// Import helpers
const {
    categoryExistByName,
    productExistByID,
} = require("../helpers/db-validators");

const router = Router();

// Get products by search engine
router.get("/", productsGet);

// Get an specific product
router.get(
    "/:id",
    [
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(productExistByID),
        validateFields,
    ],
    getProduct
);

// Post a new product
router.post(
    "/",
    [
        validateJWT,
        isAdminRole,
        check("name", "Name is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("category").custom(categoryExistByName),
        check("size", "Size is required").not().isEmpty(),
        check("color", "Color is required").not().isEmpty(),
        check("gender", "Gender is required").not().isEmpty(),
        check("available", "Available is required").not().isEmpty(),
        check("amount", "Amount is required").not().isEmpty(),
        check("price", "Price is required").not().isEmpty(),
        validateFields,
    ],
    productPost
);

// Put an specific product
router.put(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(productExistByID),
        check("name", "Name is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("category").custom(categoryExistByName),
        check("size", "Size is required").not().isEmpty(),
        check("color", "Color is required").not().isEmpty(),
        check("gender", "Gender is required").not().isEmpty(),
        check("available", "Available is required").not().isEmpty(),
        check("amount", "Amount is required").not().isEmpty(),
        check("price", "Price is required").not().isEmpty(),
        validateFields,
    ],
    productPut
);

// Delete an specific product
router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(productExistByID),
        validateFields,
    ],
    productDelete
);

module.exports = router;