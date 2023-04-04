var express = require('express');
const { ObjectId } = require('mongodb');
const db = require('../config/connection');
const fn = require('../mongodb/farmer_help');
const { ath } = require('../auth');
const async = require('hbs/lib/async');
var router = express.Router();


//form actions
router.post('/farm_product_post',ath, function(req, res, next) {
  fn.farm_pro(req.body,(callback)=>{
    let photo=req.files.Image
    console.log(photo);
    photo.mv('public/images/photos/'+callback.insertedId+'.jpg') 
    res.redirect('/farmer/view_product')
  })
});

router.post('/work_request_post',ath, function(req, res, next) {
  fn.work(req.body)
  let data=req.session.userid
  console.log(req.session.userid);
  res.render('farmer/work_request',{farmerroute:true,data});

});

router.post('/delete_post/:id',function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=db.collection('farmer_products').deleteOne({_id:objectId})
  console.log(data);
  res.redirect('/farmer/view_product')
});
// form actions

/* GET home page. */
router.get('/', ath, async function(req, res, next) {
  if(req.session.loginStatus){
  let data=await db.collection('admin_rental').find().toArray()
  res.render('farmer/home',{farmerroute:true,data});}
  
});

router.get('/purchase',ath,  async function(req, res, next) {
  let data=await db.collection('admin_products').find().toArray()
  res.render('farmer/purch_home',{farmerroute:true,data});
});

router.get('/work_request',ath,  function(req, res, next) {
  res.render('farmer/work_request',{farmerroute:true});
});
router.get('/sell_product',ath,  function(req, res, next) {
  let data=req.session.userid
  res.render('farmer/sell_products',{farmerroute:true,data});
});

router.get('/view_product',ath,  async function(req, res, next) {
 let data= await db.collection('farmer_products').find({user_id:req.session.userid}).toArray()
console.log(data)
  res.render('farmer/view_products',{farmerroute:true,data});
});

router.get('/view_orders', ath, async function(req, res, next) {
 let data = await db.collection('checkout').find().toArray()
  res.render('farmer/view_orders',{farmerroute:true,data});
});

router.get('/view_work',ath,async function(req, res, next) {
  console.log(req.session.userid)
 let data= await db.collection('Work_request').find({user_id:req.session.userid}).toArray()
 console.log(data,'jhkhh');
  res.render('farmer/view_work',{farmerroute:true,data});
});

router.get('/booking/:id',ath,  async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_rental').findOne({_id:objectId})
  res.render('farmer/booking',{farmerroute:true,data});
});
router.get('/purch_booking/:id',ath, async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_products').findOne({_id:objectId})
  res.render('farmer/purch_book',{farmerroute:true,data});
});

router.get('/category/:id',ath, async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_products').find({_id:objectId}).toArray()
  res.render('farmer/purch_home',{farmerroute:true,data});
});

router.get('/category_rent/:id',ath, async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_rental').find({_id:objectId}).toArray()
  res.render('farmer/home',{farmerroute:true,data});
});

router.get('/pincode_rent/:id',ath, async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_rental').find({_id:objectId}).toArray()
  res.render('farmer/home',{farmerroute:true,data});
});

router.post('/pincode_purchase',ath, async function(req, res, next) {
  let data=await db.collection('admin_products').find({Pincode:req.body.pincode}).toArray()
  console.log(req.body.pincode);
  res.render('farmer/purch_home',{farmerroute:true,data});
});

router.post('/pincode_rental',ath, async function(req, res, next) {
  let data=await db.collection('admin_rental').find({Pincode:req.body.pincode}).toArray()
  console.log(req.body.pincode);
  res.render('farmer/home',{farmerroute:true,data});
});



router.get('/profile',ath, async function(req, res, next) {
  let data=await db.collection('register').findOne({Username:req.session.userid})
  console.log(data)
  console.log(req.session.userid)
  res.render('farmer/profile',{farmerroute:true,data});
});

router.get('/my_orders',ath,  function(req, res, next) {
  res.render('farmer/my_orders',{farmerroute:true});
});

module.exports = router;

