const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['CLIENT_ROLE', 'ADMIN_ROLE'],
        default: 'CLIENT_ROLE'
    },
});

module.exports = mongoose.model('User', userSchema);