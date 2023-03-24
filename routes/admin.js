var express = require('express');
const db = require('../config/connection');
const fn = require('../mongodb/admin_help');
const {ObjectId}=require('mongodb');
var router = express.Router();


//form action
router.post('/product_post', function(req, res, next) {
  fn.add(req.body)
  console.log(req.body)
  res.redirect('/admin/products ',{adminroute:true})

});

router.post('/rental_post', function(req, res, next) {
  fn.rental(req.body)
  res.render('admin/rental ',{adminroute:true})

});

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
//end of form action



router.post('/login', function(req, res, next) {
  // db.collection('admin').insertOne({name:'manu', age:'22'})
  // res.render('admin/home',{adminroute:true})
  console.log('server running...');
  console.log(req.body)
});


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loginStatus=true){
    // db.collection('admin').insertOne({name:'manu', age:'22'})
    res.render('admin/home',{adminroute:true})
  }
  // else{
  //   res.redirect('/login')
  // }
  console.log(req.session,'/admin page');
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
router.get('/products', async function(req, res, next) {
  let data = await db.collection('admin_products').find().toArray()

  res.render('admin/products',{adminroute:true,data})
  
});
module.exports = router;


