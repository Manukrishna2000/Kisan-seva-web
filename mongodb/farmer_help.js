
const { response } = require('express');
const db = require('../config/connection');
const res = require('express/lib/response');

module.exports={
    register:function(value,callback){
        db.collection('register').insertOne(value).then((response)=>
    {
        callback(response)
    })
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