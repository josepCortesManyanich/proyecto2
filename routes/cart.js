const router = require('express').Router();
const app = require('../app');
const Cart = require('../models/cartmodel');
const isLoggedIn = require('../middlewares');

router.get('/', async (req, res, next) => {
    const user = req.session.currentUser;
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
        const product = await Product.findById(productId);
        console.log(product)
        const prevCart = await Cart.findOne({ user: user._id });
        console.log(prevCart)
        if (prevCart) {
            const previousPrice = prevCart.quantity;
            const newPrice = parseInt(previousPrice + product.price);
            const newCart = await Cart.findByIdAndUpdate(prevCart._id, { quantity: newPrice }, { new: true });
            newCart.products.push(product._id);
            newCart.save();
            res.redirect('/products')
        } else {
            const newCart = await Cart.create({ user: user._id, quantity: product.price });
            newCart.products.push(productId);
            newCart.save();
            res.redirect('/products')
         } 
    } catch (e) {
        console.log(e)
        next(e)
    }
})
router.post('/:userId', async(req,res,next) =>{

})

module.exports= router;