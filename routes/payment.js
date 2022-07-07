const router = require('express').Router();
const app = require('../app');
const Cart = require('../models/cartmodel');
const isLoggedIn = require('../middlewares');
const User = require('../models/User');

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
    } catch (e) {
        console.log(e)
        next(e)
    }
})