const router = require('express').Router();
const app = require('../app');
const Payment = require('../models/payment');
const isLoggedIn = require('../middlewares/isLoggedIn');
const User = require('../models/User');
const Cart = require('../models/cartmodel');
const Product = require('../models/producModel')

router.get('/', async (req, res, next) => {
    const user = req.session.currentUser;
    try {
        res.render('payment/payment')
        
    } catch (e) {
        console.log(e)
        next(e)
       
    }
})

router.post('/', async(req,res,next) =>{
    const user = req.session.currentUser;
    const {method,adress, phoneNumber} = req.body
    const parsedPhoneNumber = parseInt(phoneNumber);
    if (!method|| !adress || !phoneNumber ) {
        res.render('payment/payment', { error: 'Please fill all fields to pay ' });
        return;
    }
    try {
        const finalPayment = {method, adress, parsedPhoneNumber}
        const payment = await Payment.create(finalPayment)
        res.redirect('/products')
        if(payment){
            await Cart.findByIdAndDelete({ user: user._id }).populate('products');
            res.render('product/allproducts')
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
})

module.exports = router;