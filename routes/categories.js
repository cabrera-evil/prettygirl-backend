const { Router } = require("express");
const { check } = require("express-validator");

// Import middlewares
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

// Import controllers
const {
    categoriesGet,
    getCategory,
    categoryPost,
    categoryPut,
    categoryDelete,
} = require("../controllers/categories");

// Import helpers
const { categoryExistByID } = require("../helpers/db-validators");

const router = Router();

// Get all categories
router.get("/", categoriesGet);

// Get an specific category
router.get(
    "/:id",
    [
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(categoryExistByID),
        validateFields,
    ],
    getCategory
);

// Post a new category
router.post(
    "/",
    [
        validateJWT,
        isAdminRole,
        check("name", "Name is required").not().isEmpty(),
        validateFields,
    ],
    categoryPost
);

// Put an specific category
router.put(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(categoryExistByID),
        check("name", "Name is required").not().isEmpty(),
        validateFields,
    ],
    categoryPut
);

// Delete an specific category
router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id").custom(categoryExistByID),
        validateFields,
    ],
    categoryDelete
);

module.exports = router;