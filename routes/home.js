var express = require('express');
const db = require('../config/connection');
const fn = require('../mongodb/farmer_help');
var router = express.Router();

// form action 

router.post('/farmer_register_post', function(req, res, next) {
  fn.register(req.body)
  res.render('home/index',{homeroute:true})
});
router.post('/worker_register_post', function(req, res, next) {
  fn.register(req.body)
  res.render('home/index',{homeroute:true})
});
router.post('/customer_register_post', function(req, res, next) {
  fn.register(req.body)
  res.render('home/index',{homeroute:true})
});
router.post('/login_post',async function(req, res, next) {
  console.log(req.body);
  if(!req.body.Username==''){
    console.log('null true case');
  console.log(req.body);
  let data = await db.collection('register').findOne({Username:req.body.Username,Password:req.body.Password}).then((response)=>{
    console.log(response);
    if(response==null){
      
    }else if(response.Username=='admin' && response.Password=='admin'){
      
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
        res.redirect('/worker')
      }
      else if(response.type=='customer' && response.status=='confirm'){
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
  let er = req.session.error
  console.log(req.session.error,'error session');
  console.log(Error);
  res.render('home/login',{homeroute:true,error:req.session.error})
});
module.exports = router;