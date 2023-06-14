# Models

You must use the following schemas for POST and PUT request:


Bag
-

        user:{
                type: String,
                require:true
        },
        products:{
                type: Array,
                _id:{
                        type:String,
                        require:true
                },
                size:{
                        type:String,
                        require:true
                },
                color:{
                        type:String,
                        require:true
                },
                amount:{
                        type:Number,
                        default:1
                },
        }

Booking
-

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

Category
-

        name: {
                type: String,
                required: true
        },
        picture: {
                type: String,
                default: "https://res.cloudinary.com/cabrera-evil/image/upload/v1668401831/prettygirl-api/default/no-image_qtyjtw.jpg"
        }

Product
-

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

User
-

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

## Release Notes

v 1.0.0

## Useful Links

[API Documentation](https://documenter.getpostman.com/view/23770643/2s8YsxvWz1)

[Deployed on Railway](https://prettygirl-api-production.up.railway.app/)