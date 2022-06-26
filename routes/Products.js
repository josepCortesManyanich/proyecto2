const router = require('express').Router();
const app = require('../app');
const Product = require('../models/producModel');

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

module.exports = router;