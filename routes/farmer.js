var express = require('express');
const db = require('../config/connection');
const fn = require('../mongodb/farmer_help');
var router = express.Router();

//form actions
router.post('/farm_product_post', function(req, res, next) {
  fn.farm_pro(req.body)
  res.render('farmer/sell_products',{farmerroute:true});

});

router.post('/work_request_post', function(req, res, next) {
  fn.work(req.body)
  res.render('farmer/work_request',{farmerroute:true});

});
// form actions

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('farmer/home',{farmerroute:true});
});

router.get('/work_request', function(req, res, next) {
  res.render('farmer/work_request',{farmerroute:true});
});
router.get('/sell_product', function(req, res, next) {
  res.render('farmer/sell_products',{farmerroute:true});
});

router.get('/view_product', function(req, res, next) {
  res.render('farmer/view_products',{farmerroute:true});
});

router.get('/view_orders', function(req, res, next) {
  res.render('farmer/view_orders',{farmerroute:true});
});

router.get('/view_work', function(req, res, next) {
  res.render('farmer/view_work',{farmerroute:true});
});

router.get('/booking', function(req, res, next) {
  res.render('farmer/booking',{farmerroute:true});
});

router.get('/profile', function(req, res, next) {
  res.render('farmer/profile',{farmerroute:true});
});

router.get('/my_orders', function(req, res, next) {
  res.render('farmer/my_orders',{farmerroute:true});
});

module.exports = router;

