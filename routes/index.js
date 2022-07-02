const router = require('express').Router();

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/about', (req,res,next) => {
  res.render('about')
})

module.exports = router;
