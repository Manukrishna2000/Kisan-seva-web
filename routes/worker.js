var express = require('express');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res, next) {
  if(req.session.loginStatus){
  data= await db.collection('Work_request').find({status:'pending'}).toArray()
  res.render('worker/work_home',{workroute:true,data})}
  else{
    res.redirect('/login')
  }
});

router.post('/accept_work/:id',async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  let data= await db.collection('Work_request').updateOne({_id:objectId},{$set:{status:'accepted'}})
  res.redirect('/worker')
  console.log(data);
});

module.exports = router;