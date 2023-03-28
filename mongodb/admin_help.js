const { response } = require('../app');
const db = require('../config/connection');


module.exports={
    add:function(value,callback)
    {
        db.collection('admin_products').insertOne(value).then ((response)=>{
        callback(response)})
    }
    ,rental:function(value,callback)
    {
        db.collection('admin_rental').insertOne(value).then(function(response){
            callback(response)})
        }
        
    }
