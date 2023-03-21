var express = require('express');
const db = require('../config/connection');
var router = express.Router();


//form action
router.post('/product_post', function(req, res, next) {
  db.collection('admin_products').insertOne(req.body)
  console.log(req.body)
  res.render('admin/products ',{adminroute:true})

});

router.post('/rental_post', function(req, res, next) {
  db.collection('admin_rental').insertOne(req.body)
  res.render('admin/rental ',{adminroute:true})

});
//end of form action



router.post('/login', function(req, res, next) {
  // db.collection('admin').insertOne({name:'manu', age:'22'})
  // res.render('admin/home',{adminroute:true})
  console.log('server running...');
  console.log(req.body)
});


/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('admin').insertOne({name:'manu', age:'22'})
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
  ''
});
module.exports = router;


