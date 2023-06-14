const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

// Import controllers
const {
    bagGet,
    bagProductsGet,
    getBag,
    bagPost,
    bagPut,
    bagDelete,
} = require("../controllers/bags");

// Import helpers
const { bagExistByID, bagExistByUser, userExistByID } = require("../helpers/db-validators");

const router = Router();

// Get all bags
router.get("/", validateJWT, bagGet);

// Get an specific bag
router.get(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bagExistByUser),
        validateFields,
    ],
    getBag
);

// Get all products from a bag
router.get(
    "/products/:id",
    [
        validateJWT,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bagExistByID),
        validateFields
    ],
    bagProductsGet
)

// Post a new bag
router.post(
    "/",
    [
        validateJWT,
        check("user", "User is required").not().isEmpty(),
        check("user", "Invalid Mongo ID").isMongoId(),
        check("user").custom(userExistByID),
        check("products").not().isEmpty(),
        validateFields,
    ],
    bagPost
);

// Put an specific bag
router.put(
    "/:id",
    [
        validateJWT,
        check("user", "User is required").not().isEmpty(),
        check("user", "Invalid Mongo ID").isMongoId(),
        check("user").custom(userExistByID),
        check("products").not().isEmpty(),
        validateFields,
    ],
    bagPut
);

// Delete an specific bag
router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bagExistByID),
        validateFields,
    ],
    bagDelete
);

module.exports = router;