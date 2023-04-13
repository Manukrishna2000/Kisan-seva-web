var express = require('express');
const db = require('../config/connection');
const fn = require('../mongodb/admin_help');
const {ObjectId}=require('mongodb');
const session = require('express-session');
const { response } = require('../app');
var router = express.Router();
const nocache = require("nocache");
const { ath } = require('../auth');
const async = require('hbs/lib/async');

// ...




// const ath = (req,res,next) =>{
//   if(req.session.loginStatus){
//   console.log(req.session.id);
//     next()
//   }else{
//     res.redirect('/login')
//   }
// }
//form action
router.post('/product_post', function(req, res, next) {
  fn.add(req.body,(callback)=>{
    let photo=req.files.Image
    console.log(req.files);
    photo.mv('public/images/photos/'+callback.insertedId+'.jpg')  
    res.redirect('/admin/view_products')
    })});

router.post('/rental_post', function(req, res, next) {
  fn.rental(req.body,(callback)=>{
  let photo=req.files.Image
  console.log(req.files);
  photo.mv('public/images/photos/'+callback.insertedId+'.jpg')  
  res.redirect('/admin/view_rental')
  })});

router.post('/confirm_farmer_post/:id', async function(req, res, next) {
 const objectId = new ObjectId(req.params.id)
 if(req.body.approve=='confirm'){
  await db.collection('register').updateOne({_id:objectId},{$set:{status:'confirm'}})}
  else if(req.body.approve=='reject'){
    await db.collection('register').updateOne({_id:objectId},{$set:{status:'reject'}})
  }
  console.log(res);
  res.redirect('/admin/confirm_farmers')

});
router.post('/confirm_worker_post/:id', async function(req, res, next) {
  const objectId = new ObjectId(req.params.id) 
  if(req.body.approve=='confirm'){
    await db.collection('register').updateOne({_id:objectId},{$set:{status:'confirm'}})}
    else if(req.body.approve=='reject'){
      await db.collection('register').updateOne({_id:objectId},{$set:{status:'reject'}})
    }
    res.redirect('/admin/confirm_workers')
 });
 router.post('/delete_post/:id', function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  db.collection('admin_rental').deleteOne({_id:objectId})
  res.redirect('/admin/view_rental')

});
router.post('/delete_post_product/:id', function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  db.collection('admin_products').deleteOne({_id:objectId})
  res.redirect('/admin/products')

});
//end of form action



router.post('/login', function(req, res, next) {
  // db.collection('admin').insertOne({name:'manu', age:'22'})
  // res.render('admin/home',{adminroute:true})
  console.log('server running...');
  console.log(req.body)
});
router.get('/logout',ath,function(req, res, next){
  req.session.destroy();

  res.redirect('/login');
})


/* GET home page. */
router.get('/',ath, function(req, res, next) {
  // if(req.session.loginStatus==true){
    // db.collection('admin').insertOne({name:'manu', age:'22'})
    res.render('admin/home',{adminroute:true})
  // }
  // else{
    // res.redirect('/login')
  // }
  // console.log(req.sessionStore,'/admin page');
});
router.get('/rental',ath, function(req, res, next) {
  res.render('admin/add_rental',{adminroute:true})
 
});

router.get('/view_rental',ath, async function(req, res, next) {
  let data = await db.collection('admin_rental').find().toArray()
  res.render('admin/view_rental',{adminroute:true,data})
  
});
router.get('/confirm_workers',ath, async function(req, res, next) {
  let data = await db.collection('register').find({type:"worker"}).toArray()
  res.render('admin/confirm_workers',{adminroute:true,data})
  
});
router.get('/confirm_farmers',ath, async function(req, res, next) {
  let data = await db.collection('register').find({type:"farmer"}).toArray()
  res.render('admin/confirm_farmers',{adminroute:true,data})
});
router.get('/review',ath, function(req, res, next) {
  res.render('admin/review',{adminroute:true})
  
});
router.get('/view_products',ath, async function(req, res, next) {
  let data=await db.collection('farmer_products').find().toArray()
  res.render('admin/view_products',{adminroute:true,data})
  
});
router.post('/delete_post_farm_product/:id',function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data=db.collection('farmer_products').deleteOne({_id:objectId})
  console.log(data);
  res.redirect('/admin/view_products')
});
router.get('/notification',ath, function(req, res, next) {
  res.render('admin/notification',{adminroute:true})
  
});
router.post('/notification_post',ath, async function(req, res, next) {
  await db.collection('notification').insertOne(req.body)
  res.redirect('/admin/view_notification')
  
});
router.get('/view_notification',ath, async function(req, res, next) {
  let data = await db.collection('notification').find().toArray()
  res.render('admin/view_notification',{adminroute:true,data})

  
  
});
router.get('/delete_post_noti/:id',ath, async function(req, res, next) {
  let objectId=new ObjectId(req.params.id)
  await db.collection('notification').deleteOne({_id:objectId})
  res.redirect('/admin/view_notification')
  
  
  
});
router.get('/view_booking',ath, async function(req, res, next) {
  let data=await db.collection('farmer_rent_booking').find().toArray()
  let obj={
    RatingStatusOne:false,
    RatingStatusTwo:false,
  RatingStatusThree:false,
  RatingStatusFour:false,
  RatingStatusFive:false,
   }
   console.log(obj,'start');
   if(data[0].Rating=='1'){
    obj.RatingStatusOne=true
   }else if(data[0].Rating=='2'){
    obj.RatingStatusTwo=true
   }else if(data[0].Rating=='3'){
    obj.RatingStatusThree=true
   }else if(data[0].Rating=='4'){
    obj.RatingStatusFour=true
   }else if(data[0].Rating=='5'){
    obj.RatingStatusFive=true
   }
  res.render('admin/view_booking_rental',{adminroute:true,data,obj})
  
});
router.get('/view_booking_purch',ath, async function(req, res, next) {
  let data=await db.collection('farmer_product_booking').find().toArray()
  res.render('admin/view_booking_purchase',{adminroute:true,data})
  
});
router.get('/add_products',ath, function(req, res, next) {
  res.render('admin/add_products',{adminroute:true})
  
});
router.get('/products',ath, async function(req, res, next) {
  let data = await db.collection('admin_products').find().toArray()

  res.render('admin/products',{adminroute:true,data})
  
});
module.exports = router;


