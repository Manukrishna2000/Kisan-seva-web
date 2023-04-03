var express = require('express');
const fn = require('../mongodb/customer_help');
const { log } = require('handlebars');
const { ath } = require('../auth');
var router = express.Router();

//form actions
router.post('/checkout_post', function(req, res, next) {
  fn.checkout(req.body)
  res.render('user/orders',{farmerroute:true});

});



/* GET users listing. */

router.get('/',ath, function(req, res, next) {
  console.log(req.session.loginStatus);
  console.log(req.session.userid);
  if(req.session.loginStatus){
  res.render('customer/cust_home',{custeroute:true})}
  else{
    res.redirect('/login')
  }
});
router.get('/cart',ath, function(req, res, next) {
  res.render('customer/cart',{custeroute:true})
});

router.get('/orders',ath, function(req, res, next) {
  res.render('customer/orders',{custeroute:true})
});
router.get('/book',ath, function(req, res, next) {
  res.render('customer/cust_book',{custeroute:true})
});
router.get('/checkout',ath, function(req, res, next) {
  res.render('customer/checkout',{custeroute:true})
});
module.exports = router;
