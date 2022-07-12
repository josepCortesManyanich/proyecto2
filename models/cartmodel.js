const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartModel= new Schema({
    quantity:{
        type: Number,
        required: true
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: 'Product'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
    })

const Cart = mongoose.model('Cart', cartModel);
module.exports = Cart