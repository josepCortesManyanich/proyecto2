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
        
     catch (e) {
        console.log(e)
        next(e)
    }
})
//@route For add more products in the cart
router.post('/addmore/:productId', async(req,res,next) => {
    
     const { productId } = req.params
    
    try {
        const product = await Product.findById(productId);
        console.log(product)
        const previousPrice = prevCart.quantity;
        const newPrice = parseInt(previousPrice + product.price);
        await Cart.findByIdAndUpdate(prevCart._id, { quantity: newPrice }, { new: true });
        newCart.products.push(product._id);
        newCart.save();
        res.redirect('/products')
        
    }
     catch (e) {
        console.log(e)
        next(e)
    }
})


router.post('/delete/:productId', async(req,res,next) => {
    const { productId } = req.params
    const user = req.session.currentUser;
    try {
       const product = await Product.findById(productId)
    const prevCart = await Cart.findOne({ user: user._id });
    console.log(prevCart)
    //eliminar el product id de la array, prevCart.products, prevcart.save()
    
      
    for(let i = 0; i < prevCart.products.length; i++){
        if (prevCart.products[i] === product){
            console.log(product)
            return Cart.products.findOneAndDelete({product: product._id})
            
        }    

    }
                
    const previousPrice = prevCart.quantity;
    const newPrice = parseInt(previousPrice - product.price);
    const newCart = await Cart.findByIdAndUpdate(prevCart._id, { quantity: newPrice }, { new: true });
        
    newCart.save();
    res.redirect('/products')
    
    }catch (e) {
        console.log(e)
        next(e)
    }
})



module.exports= router;