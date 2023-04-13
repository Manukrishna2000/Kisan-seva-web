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
router.get('/orders',ath, async function(req, res, next) {
  console.log(req.session.userid);
  let u=req.session.userid
  let data= await db.collection('cust_order').find({User_id:u}).toArray()
  console.log(data);
  res.render('customer/orders',{custeroute:true,data})
});
router.post('/pincode_purchase',ath, async function(req, res, next) {
  let data=await db.collection('farmer_products').find({Pincode:req.body.pincode}).toArray()
  console.log(req.body.pincode);
  res.render('customer/cust_home',{custeroute:true,data});
});
router.get('/category/:id',ath, async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('farmer_products').find({_id:objectId}).toArray()
  res.render('customer/cust_home',{custeroute:true,data});
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
  console.log(req.session.userid);
  res.render('customer/cust_book',{custeroute:true,data,data1})
});
router.post('/cart_post/:id',async function(req,res,next){
  await db.collection('cust_order').insertOne(req.body)
  let objectId=new ObjectId(req.params.id)
  let data = await db.collection('farmer_products').findOne({_id:objectId})
    let newstock=data.Stock-req.body.Quantity;
    await db.collection('farmer_products').updateOne(
      { _id: objectId },
      { $set: { Stock: newstock } }
    );
  res.redirect('/user/orders')
})

router.post('/rating/:id',ath,async function(req,res,next){
  console.log(req.body.rate);
  let objectId=new ObjectId(req.params.id)
  let data= await db.collection('farmer_products').updateOne({_id:objectId},{$set:{Rating:req.body.rate}})
  console.log(data);
  res.redirect('/farmer/view_work')
})


module.exports = router;
