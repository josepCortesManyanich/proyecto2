const mongoose = require('mongoose');
const {Schema} = mongoose;
const cartModel= new Schema({
    totalSells:{
        type: Number,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    productsNumber:{
        type: [String];
        required:true
    }
   
    })

const Cart = mongoose.model('Cart', cartModel);
module.exports = Cart