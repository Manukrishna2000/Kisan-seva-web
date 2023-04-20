var express = require('express');
const { ObjectId } = require('mongodb');
const db = require('../config/connection');
const fn = require('../mongodb/farmer_help');
const { ath } = require('../auth');
const async = require('hbs/lib/async');
const { route } = require('./farmer');
var router = express.Router();


//form actions
router.post('/farm_product_post',ath, function(req, res, next) {
  let data={
    Name:req.body.Name,
    Price:req.body.Price,
    Category:req.body.Category,
    Stock:parseInt(req.body.Stock),
    Pincode:req.body.Pincode,
    user_id:req.session.userid
  };
  fn.farm_pro(data,(callback)=>{
    let photo=req.files.Image
    console.log(photo);
    photo.mv('public/images/photos/'+callback.insertedId+'.jpg') 
    res.redirect('/farmer/view_product')
  })
});

router.post('/work_request_post',ath, function(req, res, next) {
  fn.work(req.body)
  // let data=req.session.userid
  console.log(req.session.userid);
  res.redirect('/farmer/work_request')

});

router.post('/delete_post/:id',function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=db.collection('farmer_products').deleteOne({_id:objectId})
  console.log(data);
  res.redirect('/farmer/view_product')
});

router.post('/delete_account/:id',function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=db.collection('register').deleteOne({_id:objectId,Username:req.session.userid})
  console.log(data);
  res.redirect('/farmer/view_product')
});

router.post('/rentalbooking_post/:id',async function(req,res,next){
 let objectId=new ObjectId(req.params.id)
 let data= await db.collection('farmer_rent_booking').insertOne(req.body)
 console.log(data);
 let slot 
 if(req.body.slot1){
  
   db.collection('admin_rental').updateOne({_id:objectId},{$unset:{ slot1:'booked' }})
  }
  else if(req.body.slot2){
    db.collection('admin_rental').updateOne({_id:objectId},{$unset:{ slot2:'booked' }})
  }
  else if(req.body.slot3){
    db.collection('admin_rental').updateOne({_id:objectId},{$unset:{ slot3:'booked' }})

  }
  else if(req.body.slot4){
    db.collection('admin_rental').updateOne({_id:objectId},{$unset:{ slot4:'booked' }})

  }
  else if(req.body.slot5){
    db.collection('admin_rental').updateOne({_id:objectId},{$unset:{ slot5:'booked' }})

  }
  else if(req.body.slot6){
    db.collection('admin_rental').updateOne({_id:objectId},{$unset:{ slot6:'booked' }})

  }
  res.redirect('/farmer/my_orders')
});


router.post('/purchase_booking_post/:id',async function(req,res,next){
  let objectId=new ObjectId(req.params.id)
   await db.collection('farmer_product_booking').insertOne(req.body)
   res.redirect('/farmer')
});


// form actions

/* GET home page. */
router.get('/', ath, async function(req, res, next) {
  if(req.session.loginStatus){
  let data=await db.collection('admin_rental').find().toArray()
  console.log(data);
  res.render('farmer/home',{farmerroute:true,data});}
  
});

router.get('/purchase',ath,  async function(req, res, next) {
  let data=await db.collection('admin_products').find().toArray()
  console.log(data);
  res.render('farmer/purch_home',{farmerroute:true,data});
});

router.get('/work_request',ath,  function(req, res, next) {
  let data=req.session.userid
  res.render('farmer/work_request',{farmerroute:true,data});
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
  console.log(req.session.userid);
  let u=req.session.userid
  let data= await db.collection('cust_order').find({Farmer_id:u}).toArray()
  console.log(data);
  res.render('farmer/view_orders',{farmerroute:true,data});
});

router.get('/view_work',ath,async function(req, res, next) {
  console.log(req.session.userid)
 let data= await db.collection('Work_request_accept').find({Farmer_id:req.session.userid}).toArray()
 console.log(data,'jhkhh');
  res.render('farmer/view_work',{farmerroute:true,data});
});

router.get('/booking/:id',  async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_rental').findOne({_id:objectId})
  let data1=req.session.userid
  res.render('farmer/booking',{farmerroute:true,data,data1});
});
router.get('/purch_booking/:id',ath, async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=await db.collection('admin_products').findOne({_id:objectId})
  let data1=req.session.userid
  res.render('farmer/purch_book',{farmerroute:true,data,data1});
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

router.post('/edit_post/:id',ath, async function(req, res, next) {
  let objectId = new ObjectId(req.params.id)
  let data=await db.collection('farmer_products').findOne({_id:objectId})
  res.render('farmer/edit_products',{farmerroute:true,data});
});

router.post('/farm_edit_post/:id',ath, async function(req, res, next) {
  let objectId = new ObjectId(req.params.id)
  let data={
    Name:req.body.Name,
    Price:req.body.Price,
    Category:req.body.Category,
    Stock:parseInt(req.body.Stock),
    Pincode:req.body.Pincode,
    user_id:req.session.userid
  };
  // console.log(...update);
  await db.collection('farmer_products').updateOne({_id:objectId},{$set:data})
  res.redirect('/farmer/view_product');
});






router.get('/profile',ath, async function(req, res, next) {
  let data=await db.collection('register').findOne({Username:req.session.userid})
  console.log(data)
  console.log(req.session.userid)
  res.render('farmer/profile',{farmerroute:true,data});
});

router.get('/my_orders',ath,async  function(req, res, next) {
  let data = await db.collection('farmer_rent_booking').find({userid:req.session.userid}).toArray()
  res.render('farmer/my_orders',{farmerroute:true,data});
});



router.get('/my_purchase_orders',ath,async  function(req, res, next) {
  let data = await db.collection('farmer_product_booking').find({userid:req.session.userid}).toArray()
  console.log(data);
  res.render('farmer/purchase_orders',{farmerroute:true,data});
});

router.post('/rating/:id',ath,async function(req,res,next){
  console.log(req.body.rate);
  let objectId=new ObjectId(req.params.id)
  
  let data= await db.collection('Work_request_accept').updateOne({_id:objectId},{$set:req.body})
  console.log(data);
  res.redirect('/farmer/view_work')
})

router.post('/rating_purchase/:id',ath,async function(req,res,next){
  console.log(req.body.rate);
  let objectId=new ObjectId(req.params.id)
  let data= await db.collection('farmer_product_booking').updateOne({_id:objectId},{$set:{Rating:req.body.rate}})
  console.log(data);
  res.redirect('/farmer/my_purchase_orders')
})

router.post('/rating_rental/:id',ath,async function(req,res,next){
  console.log(req.body.rate);
  let objectId=new ObjectId(req.params.id)
  let data= await db.collection('farmer_rent_booking').updateOne({_id:objectId},{$set:{Rating:req.body.rate}})
  console.log(data);
  res.redirect('/farmer/my_orders')
})


module.exports = router;

