var express = require('express');
const db = require('../config/connection');
const fn = require('../mongodb/farmer_help');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
var router = express.Router();

// form action 

router.post('/farmer_register_post', async function(req, res, next) {
  let name=await db.collection('register').findOne({type:'farmer',Username:req.body.Username})
  if(name){
    req.session.ERor="username already exist"
      res.redirect('/farmer_register')
    
  }
  else{
    fn.register(req.body,(callback)=>{
      let photo=req.files.Photo
      let id=req.files.Id_proof
        console.log(req.files);
        photo.mv('public/images/user_photo/'+callback.insertedId+'.jpg')  
        id.mv('public/images/id_proof/'+callback.insertedId+'.jpg')
      res.redirect('/login')})
  }
});

router.post('/worker_register_post', async function(req, res, next) {
  let name=await db.collection('register').findOne({type:'farmer',Username:req.body.Username})
  if(name){
    req.session.ERor="username already exist"
      res.redirect('/worker_register')
    
  }
  else{
    fn.register(req.body,(callback)=>{
      let ph=req.files.Photos
      let id_proof=req.files.Id_proofs
        console.log(req.files);
        ph.mv('public/images/user_photo/'+callback.insertedId+'.jpg')  
        id_proof.mv('public/images/id_proof/'+callback.insertedId+'.jpg')
      res.redirect('/login')})
  }
});


router.post('/customer_register_post', async function(req, res, next) {
  let user_c=await db.collection('register').findOne({type:'customer',Username:req.body.Username})
  console.log(user_c);
  if(user_c==null)
  {
    // console.log(response);
    // if(req.body.Username==response.Username){
      
    }
    else{
    fn.register(req.body,(callback)=>{
 res.redirect('/login')})
 }
});
   
    

router.post('/login_post',async function(req, res, next) {
  console.log(req.body);
  if(!req.body.Username==''){
    console.log('null true case');
  console.log(req.body);
  let data = await db.collection('register').findOne({Username:req.body.Username,Password:req.body.Password}).then((response)=>{
    console.log(response);
    if(response==null){
      
    }
   
    else if(response.Username=='admin' && response.Password=='admin'){
      
      req.session.loginStatus = true
      res.redirect('/admin')
    }
    else if(response.type=='farmer' && response.status=='confirm'){
    req.session.loginStatus = true
    req.session.userid=response.Username
    console.log(req.session);
      
      res.redirect('/farmer')
      // console.log(message);
  }
  else if(response.type=='worker' && response.status=='confirm'){
    req.session.loginStatus = true
    req.session.userid=response.Username
        res.redirect('/worker')
      }
      else if(response.type=='customer'){
        req.session.loginStatus = true
    req.session.userid=response.Username
        res.redirect('/user')
      }
      else{
        res.write('invalid')
      }
    })
   

  
  console.log(data);
  // findOne({Username:req.body.Username});
  // function(err,data){
	// 	if(data){
			
	// 		if(data.Password==req.body.Password){
	// 			console.log("Done Login");
	// 			// req.session.userId = data.unique_id;
	// 			console.log(req.session.userId);
	// 			res.send({"Success":"Success!"});
				
	// 		}else{
	// 			res.send({"Success":"Wrong password!"});
	// 		}
	// 	}else{
	// 		res.send({"Success":"This Email Is not regestered!"});
	// 	}
	// }
  }else{
    console.log('null else case');
    let error = req.session.error ='email and password is null ';
    console.log(req.session.error,'session');
    res.redirect('/login')
    // res.render('home/login',{homeroute:true,error})
    req.session.error=null
  
  }
  
});



// end of form action



/* GET users listing. */
router.get('/', async function(req, res, next) {
  let data=await db.collection('Work_request').find({status:'pending'}).toArray()
  let data1=await db.collection('notification').find().toArray()
  res.render('home/index',{homeroute:true,data,data1})
});
router.get('/farmer_register', function(req, res, next) {
  let err=req.session.ERor
  res.render('home/register_farmer',{register:true,err})
});
router.get('/worker_register', function(req, res, next) {
  let err=req.session.ERor
  res.render('home/worker_register',{register:true,err})
});
router.get('/cust_register', function(req, res, next) {
  let err=req.session.ERor
  res.render('home/cust_register',{register:true,err})
});
router.get('/login', function(req, res, next) {
  let er = req.session.error
  console.log(req.session.error,'error session');
  console.log(Error);
  res.render('home/login',{homeroute:true,error:req.session.error})
});
module.exports = router;