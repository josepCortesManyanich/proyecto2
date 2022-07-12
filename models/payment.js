const mongoose = require('mongoose');
const {Schema} = mongoose;
const paymentModel= new Schema({
    method:{
        type: String,
        enum: ['Credit card', 'In cash'],
    },
    adress:{
        type: String,
    },
    phoneNumber:{
        type: Number
    },
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
}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentModel);
module.exports = Payment;