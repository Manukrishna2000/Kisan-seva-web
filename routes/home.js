var express = require('express');
const db = require('../config/connection');
const register = require('../mongodb/farmer_help');
var router = express.Router();

// form action 

router.post('/farmer_register_post', function(req, res, next) {
  register(req.body)
  res.render('home/index',{homeroute:true})
});
router.post('/worker_register_post', function(req, res, next) {
  register(req.body)
  res.render('home/index',{homeroute:true})
});
router.post('/customer_register_post', function(req, res, next) {
  register(req.body)
  res.render('home/index',{homeroute:true})
});
router.post('/login_post', function(req, res, next) {
db.collection('register').find(req.body.Username)
  
});



// end of form action



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home/index',{homeroute:true})
});
router.get('/farmer_register', function(req, res, next) {
  res.render('home/register_farmer',{register:true})
});
router.get('/worker_register', function(req, res, next) {
  res.render('home/worker_register',{register:true})
});
router.get('/cust_register', function(req, res, next) {
  res.render('home/cust_register',{register:true})
});
router.get('/login', function(req, res, next) {
  res.render('home/login',{homeroute:true})
});
module.exports = router;