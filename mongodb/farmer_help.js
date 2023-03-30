
const { response } = require('express');
const db = require('../config/connection');

module.exports={
    register:function(value){
        db.collection('register').insertOne(value)
    }
    ,farm_pro:function(value,callback){
        db.collection('farmer_products').insertOne(value).then((response)=>{
            callback(response)
        })
    }
    ,work:function(value){
        db.collection('Work_request').insertOne(value)
    }
}