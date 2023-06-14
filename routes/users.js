const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, hasRole, isAdminRole } = require("../middlewares");

const {
    emailExist,
    userExistByID,
} = require("../helpers/db-validators");

const {
    usersGet,
    getUser,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.get(
    "/:id",
    [
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(userExistByID),
        validateFields,
    ],
    getUser
);

router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("name", "Name must be at least 3 characters").isLength({ min: 3 }),
        check("email", "Invalid email").isEmail(),
        check("email").custom(emailExist),
        check("password", "The password must have more than 6 letters").isLength({
            min: 6,
        }),
        validateFields,
    ],
    usersPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(userExistByID),
        check("name", "Name is required").not().isEmpty(),
        check("name", "Name must be at least 3 characters").isLength({ min: 3 }),
        check("email", "Invalid email").isEmail(),
        check("password", "The password must have more than 6 letters").isLength({
            min: 6,
        }),
        validateFields,
    ],
    usersPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        hasRole("ADMIN_ROLE", "CLIENT_ROLE"),
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(userExistByID),
        validateFields,
    ],
    usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
