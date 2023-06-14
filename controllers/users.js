const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Get all users
const usersGet = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).select("name email role")
            .limit(Number(limit))
            .skip(Number(skip)),
    ]);

    res.json({
        total,
        users,
    });
};

// Get an specific user
const getUser = async (req, res = response) => {
    const { id } = req.params;
    const user = await User.findById(id).select("name email role");

    res.json(user);
};

// Post a new user
const usersPost = async (req, res) => {
    const user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);

    // Validate if the role is valid
    if(validateRole(user.role)){
        await user.save();
        res.json({
            user,
        });
    }
    // Show an error and don't save the user
    else{
        return res.status(400).json({
            msg: "Invalid role"
        });
    }
};

// Put an specific user
const usersPut = async (req, res) => {
    const { id } = req.params;
    const newUser = {...req.body};

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(newUser.password, salt);

    // Validate if the role is valid
    if(validateRole(newUser.role)){
        const updatedUser = await User.findByIdAndUpdate(id, newUser , {new: true});
        res.json(updatedUser);
    }
    // Show an error and don't save the user
    else{
        return res.status(400).json({
            msg: "Invalid role"
        });
    }
};

// Patch an specific user field
const usersPatch = (req, res = response) => {
    res.json({
        msg: "patch API - Controller",
    });
};

// Delete an specific user
const usersDelete = async (req, res = response) => {
    const { id } = req.params;

    const userDB = await User.findByIdAndDelete(id);
    res.json({
        userDB,
    });
};

//Helper functions
const validateRole = (role) =>{
    if(role == "ADMIN_ROLE" || role == "CLIENT_ROLE"){
        return true;
    }
    return false;
}

module.exports = {
    usersGet,
    getUser,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
};
