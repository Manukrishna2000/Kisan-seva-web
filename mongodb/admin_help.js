const db = require('../config/connection');


module.exports={
    add:function(value)
    {
        db.collection('admin_products').insertOne(value)
    }
    ,rental:function(value)
    {
        db.collection('admin_rental').insertOne(value)
    }
}