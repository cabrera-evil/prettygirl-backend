const mongoose = require('mongoose');

const bagSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('Bag', bagSchema);