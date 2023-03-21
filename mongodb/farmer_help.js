
const db = require('../config/connection');

function register(value){
    db.collection('register').insertOne(value)
}
module.exports=register