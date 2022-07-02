const router = require('express').Router();
const app = require('../app');
const Product = require('../models/producModel');
const isLoggedIn = require('../middlewares');

// @desc    Products list/ All the products
// @route   GET /products
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

// @desc    View the form to create a product
// @route   GET /products/create
// @access  Private
router.get('/create', isLoggedIn, (req,res,next) => {
    res.render('product/create-products')
})

// @desc    Send product data to database
// @route   POST /products/create
// @access  Private
router.post('/create', isLoggedIn, async(req,res,next) => {
    const {name, family, price, cbd} = req.body;
    const priceParsed = parseInt(price);
    const cbdParsed = parseInt(cbd);
    if (!name || !family || !price || !cbd) {
        res.render('product/create-products', { error: 'Please fill all fields to create a product' });
        return;
    }
    try {
        const newProduct = {name, family, priceParsed, cbdParsed} 
        const product = await Product.create(newProduct)
        res.redirect(`/products/details/${product._id}`)
    } catch (e) {
        console.log(e)
        next(e);
    }
})

// @desc    UPDATE products 
// @route   GET /products/edit/:productId
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

// @desc    Edit products
// @route   POST /edit/:productId
// @access  Private
router.post('/edit/:productId',isLoggedIn, async(req,res,next) =>{
    const{ productId } = req.params
    const {name, family, price, cbd, description } = req.body;
    const priceParsed = parseInt(price);
    const cbdParsed = parseInt(cbd);
    if (!name || !family || !price || !cbd) {
        res.render('product/edit', { error: 'Please fill all fields to create a product' });
        return;
    }
    try {
        // const productsfromDB = { name, family, priceParsed, cbdParsed };
        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, family, price: priceParsed, cbd: cbdParsed, description }, { new: true })
        res.redirect(`/products/details/${productId}`);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

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