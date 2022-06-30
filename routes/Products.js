const router = require('express').Router();
const app = require('../app');
const Product = require('../models/producModel');

//Ruta de read
router.get('/', async(req,res,next) => {
    try {
        const productsfromDB = await Product.find({})
        res.render('product/allproducts', {productsfromDB})
    } catch (e) {
        console.log(e)
        next(e)
    }
})

//Rutas de create
router.get('/create', (req,res,next) => {
    res.render('product/create-products')
})

router.post('/create', async(req,res,next) => {
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

//Rutas de update
router.get('/edit/:productId', async(req,res,next) => {
    const{ productId } = req.params
    try {
        const productsfromDB = await Product.findById(productId)
        res.render('product/edit', productsfromDB)
    } catch (e) {
        console.log(e)
        next(e);
    }
})

router.post('/edit/:productId', async(req,res,next) =>{
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
//Rutas de detalles

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

// Rutas de Delete
router.get('/delete/:productId', async (req, res, next) => {
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