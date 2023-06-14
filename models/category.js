const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/cabrera-evil/image/upload/v1668401831/prettygirl-api/default/no-image_qtyjtw.jpg"
    }
});

module.exports = mongoose.model('Category', categorySchema);