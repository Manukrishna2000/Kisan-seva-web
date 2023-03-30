var express = require('express');
const db = require('../config/connection');
const fn = require('../mongodb/admin_help');
const {ObjectId}=require('mongodb');
const session = require('express-session');
const { response } = require('../app');
var router = express.Router();


const ath = (req,res,next) =>{
  if(req.session.loginStatus){
    next()
  }else{
    res.redirect('/login')
  }
}
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
  db.collection('farmer_products').deleteMany({_id:objectId})
  res.redirect('/farmer/view_product')

});
router.post('/delete_post_product/:id', function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  db.collection('admin_products').deleteMany({_id:objectId})
  res.redirect('/admin/products')

});
//end of form action



router.post('/login', function(req, res, next) {
  // db.collection('admin').insertOne({name:'manu', age:'22'})
  // res.render('admin/home',{adminroute:true})
  console.log('server running...');
  console.log(req.body)
});



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
router.get('/rental', function(req, res, next) {
  res.render('admin/add_rental',{adminroute:true})
 
});

router.get('/view_rental', async function(req, res, next) {
  let data = await db.collection('admin_rental').find().toArray()
  res.render('admin/view_rental',{adminroute:true,data})
  
});
router.get('/confirm_workers', async function(req, res, next) {
  let data = await db.collection('register').find({type:"worker"}).toArray()
  res.render('admin/confirm_workers',{adminroute:true,data})
  
});
router.get('/confirm_farmers', async function(req, res, next) {
  let data = await db.collection('register').find({type:"farmer"}).toArray()
  res.render('admin/confirm_farmers',{adminroute:true,data})
  
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
router.get('/products',ath, async function(req, res, next) {
  let data = await db.collection('admin_products').find().toArray()

  res.render('admin/products',{adminroute:true,data})
  
});
module.exports = router;


