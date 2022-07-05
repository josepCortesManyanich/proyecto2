const router = require('express').Router();
const app = require('../app');
const Cart = require('../models/cartmodel');
const isLoggedIn = require('../middlewares');
const User = require('../models/User');
const Product = require('../models/producModel');
router.get('/', async (req, res, next) => {
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
})
router.post('/:productId', async(req,res,next) => {
    // const {totalSells, quantity, productsNumber} = req.body;
     const { productId } = req.params
    //  const parsedSells = parseInt(totalSells);
    //  const parsedQuantity = parseInt(quantity);
    const user = req.session.currentUser;
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
         } 
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
})
module.exports= router;