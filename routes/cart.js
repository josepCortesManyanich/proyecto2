const router = require('express').Router();
const Cart = require('../models/cartmodel');
const isLoggedIn = require('../middlewares/isLoggedIn');
const User = require('../models/User');
const Product = require('../models/producModel');

router.get('/', isLoggedIn, async (req, res, next) => {
    const user = req.session.currentUser;
    try {
        const cart = await Cart.findOne({ user: user._id }).populate('products');
        if (cart) {
            res.render('cart/cartpage', { cart })
            return;
        } else {
            res.render('cart/cartpage', { message: 'Still no products in your cart. Add some on the store! ' })
            return;
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
});

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

//@route For add more products in the cart
// router.post('/addmore/:productId', isLoggedIn, async(req,res,next) => {
//     const { productId } = req.params
//     const user = req.session.currentUser
//     try {
//         const product = await Product.findById(productId);
//         console.log(product)
//         const prevCart = await Cart.findOne({ user: user._id });
//         const previousPrice = prevCart.quantity;
//         const previousTotal = prevCart.totalProduct
//         const newTotal = parseInt(previousTotal + 1)
//         const newPrice = parseFloat(previousPrice + product.price).toFixed(2);
//         await Cart.findByIdAndUpdate(prevCart._id, { quantity: newPrice }, {totalProduct: newTotal}, { new: true });
//         const newCart = await Cart.create({ user: user._id, quantity: product.price })
//         newCart.products.push(product._id);
//         newCart.save();
//         res.redirect('/products')
//     }
//      catch (e) {
//         console.log(e)
//         next(e)
//     }
// })

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