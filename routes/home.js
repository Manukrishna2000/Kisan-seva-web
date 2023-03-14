var express = require('express');
var router = express.Router();

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