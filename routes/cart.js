const router = require('express').Router();
const Cart = require('../models/cartmodel');
const isLoggedIn = require('../middlewares/isLoggedIn');
const User = require('../models/User');
const Product = require('../models/producModel');


//@route for show all the products in the cart
router.get('/', isLoggedIn, async (req, res, next) => {
    const user = req.session.currentUser;
    try {
        const cart = await Cart.findOne({ user: user._id }).populate('products');
        if (cart) {
            res.render('cart/cartpage', { cart })
            return;
        } else {
            res.render('cart/cartpage', { message: "You Still don't have any items in the cart, discover our products. " })
            return;
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
});

//@route for add products in the cart
router.post('/:productId', isLoggedIn, async(req,res,next) => {
    const { productId } = req.params;
    const user = req.session.currentUser;
    try {
        const product = await Product.findById(productId);
        const prevCart = await Cart.findOne({ user: user._id });
        if (prevCart) {
            const previousPrice = prevCart.quantity;
            const newPrice = parseFloat(previousPrice + product.price).toFixed(2);
            const newCart = await Cart.findByIdAndUpdate(prevCart._id, { quantity: newPrice }, { new: true });
            newCart.products.push(product._id);
            newCart.save();
            res.redirect('/cart')
        } else {
            const newCart = await Cart.create({ user: user._id, quantity: product.price });
            newCart.products.push(productId);
            newCart.save();
            res.redirect('/cart')
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
})

//@route for delete products in cart

router.post('/delete/:productId', isLoggedIn, async (req, res, next) => {
    const { productId } = req.params
    const user = req.session.currentUser;
    try {
        const product = await Product.findById(productId)
        const prevCart = await Cart.findOne({ user: user._id });
        console.log(prevCart.products)
        prevCart.products.pull({ _id: productId });
        prevCart.save();    
        const previousPrice = prevCart.quantity;
        const newPrice = parseFloat(previousPrice - product.price).toFixed(2);
        await Cart.findByIdAndUpdate(prevCart._id, { quantity: newPrice }, { new: true });
        res.redirect('/cart')
    } catch (e) {
        console.log(e)
        next(e)
    }
});

module.exports= router;