var express = require('express');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
const { ath } = require('../auth');
const { log } = require('handlebars');
var router = express.Router();

/* GET home page. */
router.get('/', ath, async function(req, res, next) {
  if (req.session.loginStatus) {
    let data = await db.collection('Work_request').find({ Worker_Nos: { $ne: 0 } }).toArray();
    let data2 = await db.collection('Work_request_accept').find().toArray();

    console.log(data2, 'datas2');

    let hasUserAccepted = false;
    console.log(data2)
      if (data2.user_id === req.session.userid) {
        hasUserAccepted = true;
        
      }
    

    if (!hasUserAccepted) {
      console.log(req.session.userid);
      console.log(data);
      let data1 = req.session.userid;
      res.render('worker/work_home', { workroute: true, data, data1 });
    } else {
      res.render('worker/work_home', { workroute: true });
    }
  } else {
    res.redirect('/login');
  }
});
router.get('/view_works',ath,async function(req, res, next) {
  // console.log(req.session.userid)
 let data= await db.collection('Work_request_accept').find({user_id:req.session.userid}).toArray()
 console.log(data);
  res.render('worker/work_accept',{workroute:true,data});
});

router.post('/accept_work/:id',ath, async function(req, res, next) {
  const objectId = new ObjectId(req.params.id)
  console.log(objectId);
  let data= await db.collection('Work_request_accept').insertOne(req.body)
  await db.collection('Work_request').findOne({_id:objectId}).then((data)=>{
    let nos=data.Worker_Nos-1
    db.collection('Work_request').updateOne({_id:objectId},{$set:{Worker_Nos:nos}})
  
  })
  await db.collection('Work_request').updateOne({_id:objectId},{$set:{ status:'Accepted' }})
  res.redirect('/worker')
  console.log(data);
});
router.post('/pincode_purchase',ath, async function(req, res, next) {
  let data=await db.collection('Work_request').find({Pincode:req.body.pincode}).toArray()
  console.log(req.body.pincode);
  res.render('worker/work_home',{workroute:true,data});
});
module.exports = router;