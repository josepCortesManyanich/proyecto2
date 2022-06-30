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
    // Catch category from radio button

    // Check if user ha rellenado todos los campos
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
        res.render('product/create-products', { error: 'Something went wrong, try again.'})
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
        
    }
})

router.post('/edit/:productId', async(req,res,next) =>{
    const{ productId } = req.params
    const {name, family, price, cbd} = req.body;
    const priceParsed = parseInt(price);
    const cbdParsed = parseInt(cbd);
    // Catch category from radio button
    if (!name || !family || !price || !cbd) {
        res.render('product/edit', { error: 'Please fill all fields to create a product' });
        return;
    }
    try {
        const productsfromDB = { name, family, priceParsed, cbdParsed} 
        await Product.findByIdAndUpdate(productId, {productsfromDB})
        console.log('Just updated:', productsfromDB)
        res.render('product/edit')
    } catch (e) {
        console.log(e)
    }
})

//Rutas de detalles

router.get('/details/:productId', async(req,res,next) => {
    const { productId } = req.params;
    try {
        const productsfromDB = await Product.findById(productId)
        res.render('product/details', productsfromDB)
    } catch (e) {
        console.log(e)
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