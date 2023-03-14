var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('customer/cust_home',{custeroute:true})
});

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
