var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/home',{adminroute:true})
});
router.get('/rental', function(req, res, next) {
  res.render('admin/add_rental',{adminroute:true})
 
});

router.get('/view_rental', function(req, res, next) {
  res.render('admin/view_rental',{adminroute:true})
  
});
router.get('/confirm_workers', function(req, res, next) {
  res.render('admin/confirm_workers',{adminroute:true})
  
});
router.get('/confirm_farmers', function(req, res, next) {
  res.render('admin/confirm_farmers',{adminroute:true})
  
});
router.get('/review', function(req, res, next) {
  res.render('admin/review',{adminroute:true})
  
});
router.get('/view_products', function(req, res, next) {
  res.render('admin/view_products',{adminroute:true})
  
});
router.get('/view_farmers', function(req, res, next) {
  res.render('admin/view_farmers',{adminroute:true})
  
});
router.get('/view_workers', function(req, res, next) {
  res.render('admin/view_workers',{adminroute:true})
  
});
router.get('/view_booking', function(req, res, next) {
  res.render('admin/view_booking',{adminroute:true})
  
});
router.get('/add_products', function(req, res, next) {
  res.render('admin/add_products',{adminroute:true})
  
});
router.get('/products', function(req, res, next) {
  res.render('admin/products',{adminroute:true})
  
});
module.exports = router;
