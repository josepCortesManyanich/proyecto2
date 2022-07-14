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
    const { cardname, address, cardNumber, expyear, cvv, expmonth } = req.body
    const cart = await Cart.findOne({ user: user._id });
    const parsedCardNumber = parseInt(cardNumber);
    if (!cardname|| !address || !cardNumber || !expyear || !cvv || !expmonth) {
        res.render('payment/payment', { error: 'Please fill all fields to pay' });
        return;
    }
    try {
        const finalPayment = {cardname, address, parsedCardNumber, expyear, cvv, expmonth, quantity: cart.quantity, products: cart.products, user: user._id}
        const payment = await Payment.create(finalPayment);
        if(payment){
            await Cart.findByIdAndDelete(cart._id);
            res.redirect('/paymentdone')
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
})

module.exports = router;