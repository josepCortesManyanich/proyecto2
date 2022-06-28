const mongoose = require('mongoose')
const {Schema} = mongoose;
const productSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    family:{
        type: String,
        required:true
    },
    category: {
        type: String,
        enum: ['oil', 'flower'],
    },
    price:{
        type: Number,
        required:true
    },
    cbd:{
        type: Number,
        required:true
    },
    image:{
        type: String,
    },
    description:{
        type:String,
        required:true
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product