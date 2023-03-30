var express = require('express');
const { ObjectId } = require('mongodb');
const db = require('../config/connection');
const fn = require('../mongodb/farmer_help');
var router = express.Router();


//form actions
router.post('/farm_product_post', function(req, res, next) {
  fn.farm_pro(req.body,(callback)=>{
    let photo=req.files.Image
    console.log(photo);
    photo.mv('public/images/photos/'+callback.insertedId+'.jpg') 
    res.redirect('/farmer/view_product')
  })
});

router.post('/work_request_post', function(req, res, next) {
  fn.work(req.body)
  res.render('farmer/work_request',{farmerroute:true});

});

router.post('/delete_post/:id', function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  db.collection('farmer_products').deleteMany({_id:objectId})
  res.redirect('/farmer/view_product')
});
// form actions

/* GET home page. */
router.get('/', async function(req, res, next) {
  let data=await db.collection('admin_rental').find().toArray()
  res.render('farmer/home',{farmerroute:true,data});
});

router.get('/purchase', async function(req, res, next) {
  let data=await db.collection('admin_products').find().toArray()
  res.render('farmer/purch_home',{farmerroute:true,data});
});

router.get('/work_request', function(req, res, next) {
  res.render('farmer/work_request',{farmerroute:true});
});
router.get('/sell_product', function(req, res, next) {
  res.render('farmer/sell_products',{farmerroute:true});
});

router.get('/view_product', async function(req, res, next) {
 let data= await db.collection('farmer_products').find().toArray()
console.log(data)
  res.render('farmer/view_products',{farmerroute:true,data});
});

router.get('/view_orders', async function(req, res, next) {
 let data = await db.collection('checkout').find().toArray()
  res.render('farmer/view_orders',{farmerroute:true,data});
});

router.get('/view_work', function(req, res, next) {
  res.render('farmer/view_work',{farmerroute:true});
});

router.get('/booking/:id', async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_rental').findOne({_id:objectId})
  res.render('farmer/booking',{farmerroute:true,data});
});
router.get('/purch_booking/:id', async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_products').findOne({_id:objectId})
  res.render('farmer/purch_book',{farmerroute:true,data});
});

router.get('/category/:id', async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_products').find({_id:objectId}).toArray()
  res.render('farmer/purch_home',{farmerroute:true,data});
});

router.get('/category_rent/:id', async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_rental').find({_id:objectId}).toArray()
  res.render('farmer/home',{farmerroute:true,data});
});

router.get('/pincode_rent/:id', async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_rental').find({_id:objectId}).toArray()
  res.render('farmer/home',{farmerroute:true,data});
});

router.post('/pincode_purchase', async function(req, res, next) {
  let data=await db.collection('admin_products').find({Pincode:req.body.pincode}).toArray()
  console.log(req.body.pincode);
  res.render('farmer/purch_home',{farmerroute:true,data});
});

router.post('/pincode_rental', async function(req, res, next) {
  let data=await db.collection('admin_rental').find({Pincode:req.body.pincode}).toArray()
  console.log(req.body.pincode);
  res.render('farmer/home',{farmerroute:true,data});
});



router.get('/profile',async function(req, res, next) {
  let data=await db.collection('register').findOne({Username:req.session.userid})
  console.log(data)
  console.log(req.session.userid)
  res.render('farmer/profile',{farmerroute:true,data});
});

router.get('/my_orders', function(req, res, next) {
  res.render('farmer/my_orders',{farmerroute:true});
});

module.exports = router;

