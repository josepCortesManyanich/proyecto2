const router = require('express').Router();
const app = require('../app');
const Cart = require('../models/cartmodel');
const isLoggedIn = require('../middlewares');

router.get('/', async(req,res,next) => {
    try {
        const userProducts = await Cart.find({});
        res.render('cart/cartpage', userProducts)
    } catch (e) {
        console.log(e)
        next(e)
       
    }
})

router.post('/:userId', async(req,res,next) => {
     const {totalSells, quantity, productsNumber} = req.body;
     const {userId} = req.params
     const parsedSells = parseInt(totalSells);
     const parsedQuantity = parseInt(quantity);

    try {
        const newCartProduct = {parsedSells,parsedQuantity,productsNumber}
        await Cart.create({userProducts});
        await Cart.findById(userId)
        user.cart.push('New product', newCartProduct);
        user.save()
        res.redirect('/products')
    } catch (e) {
        console.log(e)
        next(e)
    }
})

module.exports= router;