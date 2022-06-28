const mongoose = require('mongoose')
const {Schema} = mongoose;
const productSchema = new Schema({
    name:{
        type: String,
    },
    family:{
        Type: String,
    },
    price:{
        type: Number,
    },
    cbd:{
        type: Number,
    },
    image:{
        type: String,
    },
    description:{
        type:String
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product