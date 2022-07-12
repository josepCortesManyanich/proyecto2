const router = require('express').Router();
const app = require('../app');
const Payment = require('../models/payment');
const isLoggedIn = require('../middlewares/isLoggedIn');
const User = require('../models/User');
const Cart = require('../models/cartmodel');
const Product = require('../models/producModel')

router.get('/', async (req, res, next) => {
    const user = req.session.currentUser;
    const cart = await Cart.findOne({ user: user._id });
    // Pintamos en la vista de pago el total de precio, etc.
    try {
        res.render('payment/payment')
    } catch (e) {
        console.log(e)
        next(e)
       
    }
})

router.post('/', async(req,res,next) =>{
    const user = req.session.currentUser;
    const { method, adress, phoneNumber } = req.body
    const cart = await Cart.findOne({ user: user._id });
    const parsedPhoneNumber = parseInt(phoneNumber);
    if (!method|| !adress || !phoneNumber ) {
        res.render('payment/payment', { error: 'Please fill all fields to pay' });
        return;
    }
    try {
        const finalPayment = {method, adress, parsedPhoneNumber, quantity: cart.quantity, products: cart.products, user: user._id}
        const payment = await Payment.create(finalPayment);
        if(payment){
            await Cart.findByIdAndDelete(cart._id);
            res.redirect('/products')
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
})

module.exports = router;