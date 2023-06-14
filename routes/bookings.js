const { Router } = require("express");
const { check } = require("express-validator");

// Import middlewares
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

// Import controllers
const {
    bookingGet,
    getBooking,
    bookingPost,
    bookingPut,
    bookingDelete,
} = require("../controllers/bookings");

// Import helpers
const { bookingExistByID, userExistByID } = require("../helpers/db-validators");

const router = Router();

// Get all bookings
router.get("/", validateJWT, bookingGet);

// Get an specific booking
router.get(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bookingExistByID),
        validateFields,
    ],
    getBooking
);

// Post a new booking
router.post(
    "/",
    [
        validateJWT,
        check("description.products", "products are required").not().isEmpty(),
        check("user", "User is required").not().isEmpty(),
        check("user").custom(userExistByID),
        check("address", "Address is required").not().isEmpty(),
        validateFields,
    ],
    bookingPost
);

// Put an specific booking
router.put(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("description.products", "products are required").not().isEmpty(),
        check("id").custom(bookingExistByID),
        check("user", "User is required").not().isEmpty(),
        check("user").custom(userExistByID),
        check("address", "Address is required").not().isEmpty(),
        validateFields,
    ],
    bookingPut
);

// Delete an specific booking
router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bookingExistByID),
        validateFields,
    ],
    bookingDelete
);

module.exports = router;