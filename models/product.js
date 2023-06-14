const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    gender: {
        type: String,
        enum: ["Masculino", "Femenino", "Unisex"],
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/cabrera-evil/image/upload/v1668401831/prettygirl-api/default/no-image_qtyjtw.jpg"
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);