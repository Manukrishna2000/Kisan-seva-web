var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('customer/cust_home',{custeroute:true})
});

router.get('/cart', function(req, res, next) {
  res.render('customer/cart',{custeroute:true})
});
module.exports = router;
