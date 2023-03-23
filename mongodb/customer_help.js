const db = require('../config/connection');

module.exports={
    checkout:function(value){
    db.collection('checkout').insertOne(value)
}
}