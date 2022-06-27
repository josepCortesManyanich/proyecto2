const router = require('express').Router();
const app = require('../app');
const Product = require('../models/producModel');

//Ruta de read
router.get('/', async(req,res,next) => {
    try {
        const productsfromDB = await Product.find({})
        res.render('product/allProducts', {productsfromDB})
    } catch (e) {
        console.log(e)
    }
})

//Rutas de create
router.get('/create', (req,res,next) => {
    res.render('product/create-products')
})

router.post('/create', async(req,res,next) => {
    const {name, class: price, cbd} = req.body;
    const priceParsed = parseInt(price);
    const cbdParsed = parseInt(cbd);
    try {
        const newProduct = {name, class: priceParsed, cbdParsed} 
        await Product.create(newProduct)
        res.redirect('product/create-products')
    } catch (e) {
        console.log(e)
        res.render('product/create-products')
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
    const {name, class: price, cbd} = req.body;
    const priceParsed = parseInt(price);
    const cbdParsed = parseInt(cbd);
    try {
        const productsfromDB = { name, class: priceParsed, cbdParsed} 
        await Product.findByIdAndUpdate(productId, {})
        console.log('Just updated:', productsfromDB)
        res.redirect(`/edit/${productId}`)
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