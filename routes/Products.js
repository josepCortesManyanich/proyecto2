const router = require('express').Router();
const app = require('../app');
const Product = require('../models/producModel');

//Rutas de create
router.get('/create', (req,res,next) => {
    res.render('product/create-products.hbs')
})

router.post('/create', async(req,res,next) => {
    const {name, class, price, cbd} = req.body;
    const priceParsed = parseInt(price);
    const cbdParsed = parseInt(cbd);
    try {
        const {name, class, priceParsed, cbdParsed} = newProduct
        await Product.create(newProduct)
        res.redirect('product/create-products.hbs')
    } catch (e) {
        console.log(e)
        res.render('product/create-products.hbs')
    }
})

module.exports = router;