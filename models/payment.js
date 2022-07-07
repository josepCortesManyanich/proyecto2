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
    }
   
    })

const Payment = mongoose.model('Payment', paymentModel);
module.exports = Payment