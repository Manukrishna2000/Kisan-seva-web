var express = require('express');
var router = express.Router();

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


module.exports = router;