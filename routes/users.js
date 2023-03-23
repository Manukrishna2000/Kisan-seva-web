var express = require('express');
const fn = require('../mongodb/customer_help');
var router = express.Router();

//form actions
router.post('/checkout_post', function(req, res, next) {
  fn.checkout(req.body)
  res.render('user/orders',{farmerroute:true});

});



/* GET users listing. */


router.get('/cart', function(req, res, next) {
  res.render('customer/cart',{custeroute:true})
});

router.get('/orders', function(req, res, next) {
  res.render('customer/orders',{custeroute:true})
});
router.get('/book', function(req, res, next) {
  res.render('customer/cust_book',{custeroute:true})
});
router.get('/checkout', function(req, res, next) {
  res.render('customer/checkout',{custeroute:true})
});
module.exports = router;
