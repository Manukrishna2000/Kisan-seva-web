
const db = require('../config/connection');

module.exports={
    register:function(value){
        db.collection('register').insertOne(value)
    }
    ,farm_pro:function(value){
        db.collection('farmer_products').insertOne(value)
    }
    ,work:function(value){
        db.collection('Work_request').insertOne(value)
    }
}