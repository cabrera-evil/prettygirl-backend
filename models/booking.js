const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    description:{
        products:{
            type: Array,
            name:{
                type: String,
                required: true
            },
            size:{
                type: String,
                required: true
            },
            color:{
                type: String,
                required: true
            },
            amount:{
                type: Number,
                required: true
            },
        },
        total:{
            type: Number,
            default: 0
        }
    },
    user: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    delivery: {
        type: Boolean,
        default: false
    },
    estimatedDelivery: {
        type: Date,
        default: null
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Booking', bookingSchema);