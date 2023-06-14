const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const Booking = require("../models/booking");
const Bag = require("../models/bag")

// Validate if the email exist
const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`Email: ${email} already exist`);
  }
};

// Validate if the user exist
const userExistByID = async (id = "") => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`User ID:${id} does not exist`);
  }
};

// Validate if the category exist by id
const categoryExistByID = async (id = "") => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) {
    throw new Error(`Category:${id} does not exist`);
  }
};

// Validate if the category exist by name
const categoryExistByName = async (name = "") => {
  const categoryExist = await Category.findOne({name});
  if (!categoryExist) {
    throw new Error(`Category:${name} does not exist`);
  }
};

// Validate if the product exist
const productExistByID = async (id = "") => {
  const productExist = await Product.findById(id);
  if (!productExist) {
    throw new Error(`Product ID:${id} does not exist`);
  }
};

// Validate if the booking exist
const bookingExistByID = async (id = "") => {
  const bookingExist = await Booking.findById(id);
  if (!bookingExist) {
    throw new Error(`Booking ID:${id} does not exist`);
  }
};

// Validate if the bag exist by id
const bagExistByID = async (id = "") => {
  const bagExist = await Bag.findById(id);
  if (!bagExist) {
    throw new Error(`Bag ID:${id} does not exist`);
  }
};

// Validate if the bag exist by user id
const bagExistByUser = async (id = "") => {
  const bagExist = await Bag.find({user: id,});
  if (!bagExist) {
    throw new Error(`Bag User ID:${id} does not exist`);
  }
};

module.exports = { 
  emailExist,
  userExistByID,
  categoryExistByID,
  categoryExistByName,
  productExistByID,
  bookingExistByID,
  bagExistByID,
  bagExistByUser,
};
