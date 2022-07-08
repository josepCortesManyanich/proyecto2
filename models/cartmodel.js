const mongoose = require('mongoose');
const {Schema} = mongoose;
const cartModel= new Schema({
    // totalSells:{
    //     type: Number,
    //     required:true
    // },
    quantity:{
        type: Number,
        required: true
    },
    totalProduct:{
      type: Number,
      required: true,
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: 'Product'
    },
    user: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    }
    })

const Cart = mongoose.model('Cart', cartModel);
module.exports = Cart