const router = require('express').Router();
const app = require('../app');
const Product = require('../models/producModel');
const isLoggedIn = require('../middlewares');

// Read Route
// @desc    Products list/ All the products
// @route   GET /
// @access  Public
router.get('/', async(req,res,next) => {
    try {
        const productsfromDB = await Product.find({})
        res.render('product/allproducts', {productsfromDB})
    } catch (e) {
        console.log(e)
        next(e)
    }
})

// Create Route
// @desc    Create a Product
// @route   GET /create
// @access  Private
router.get('/create', isLoggedIn, (req,res,next) => {
    res.render('product/create-products')
})

router.post('/create', isLoggedIn, async(req,res,next) => {
    const {name, family, price, cbd} = req.body;
    const priceParsed = parseInt(price);
    const cbdParsed = parseInt(cbd);
    try {
        const newProduct = {name, family, priceParsed, cbdParsed} 
        const product = await Product.create(newProduct)
        res.redirect(`/products/details/${product._id}`)
    } catch (e) {
        console.log(e)
        next(e);
    }
})

// Update Route
// @desc    UPDATE products 
// @route   GET /edit/:productId
// @access  Private
router.get('/edit/:productId', isLoggedIn, async(req,res,next) => {
    const{ productId } = req.params
    try {
        const productsfromDB = await Product.findById(productId)
        res.render('product/edit', productsfromDB)
    } catch (e) {
        console.log(e)
        next(e);
    }
})
// Update Route
// @desc    Edit products
// @route   POST /edit/:productId
// @access  Private
router.post('/edit/:productId',isLoggedIn, async(req,res,next) =>{
    const{ productId } = req.params
    const {name, family, price, cbd, description } = req.body;
    const priceParsed = parseInt(price);
    const cbdParsed = parseInt(cbd);
    try {
        // const productsfromDB = { name, family, priceParsed, cbdParsed };
        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, family, price: priceParsed, cbd: cbdParsed, description }, { new: true })
        res.redirect(`/products/details/${productId}`);
    } catch (e) {
        console.log(e);
        next(e);
    }
})
// Details Route
// @desc    Product details 
// @route   GET /details/:productId
// @access  Public

router.get('/details/:productId', async(req,res,next) => {
    const { productId } = req.params;
    try {
        const productsfromDB = await Product.findById(productId)
        console.log(productsfromDB);
        res.render('product/details', productsfromDB)
    } catch (e) {
        console.log(e)
        next(e);
    }
})

// Delete Route
// @desc    Delete product 
// @route   GET /delete/:productId
// @access  Private

router.get('/delete/:productId', isLoggedIn,async (req, res, next) => {
    try {
        const { productId } = req.params;
         const deletedP = await Product.findByIdAndDelete(productId);
        res.redirect('/Products')
        console.log(deletedP)
    } catch (error) {
        next(error)
        console.log(error);
    }
})

module.exports = router;