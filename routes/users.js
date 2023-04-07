var express = require('express');
const fn = require('../mongodb/customer_help');
const { log } = require('handlebars');
const { ath } = require('../auth');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
const async = require('hbs/lib/async');
const { redirect } = require('express/lib/response');
var router = express.Router();

//form actions
router.post('/checkout_post', function(req, res, next) {
  fn.checkout(req.body)
  res.render('user/orders',{farmerroute:true});

});



/* GET users listing. */

router.get('/',ath, async function(req, res, next) {
  let data=await db.collection('farmer_products').find().toArray()
  console.log(req.session.loginStatus);
  console.log(req.session.userid);
  if(req.session.loginStatus){
  res.render('customer/cust_home',{custeroute:true,data})}
  else{
    res.redirect('/login')
  }
});
router.get('/cart',ath, async function(req, res, next) {
  console.log(req.session.userid);
  let u=req.session.userid
  let data1= await db.collection('cart').find({userid:u}).toArray()
  console.log(data1);
  res.render('customer/cart',{custeroute:true,data1})
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
router.get('/booking/:id',ath, async function(req, res, next) {
  const objectId=new ObjectId (req.params.id)  
  let data=await db.collection('farmer_products').findOne({_id:objectId})
  console.log(data);
  let data1=req.session.userid
  res.render('customer/cust_book',{custeroute:true,data,data1})
});
router.post('/cart_post',async function(req,res,next){
  await db.collection('cart').insertOne(req.body)
  res.redirect('/user/cart')
})

module.exports = router;
