const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://manukrishnaap:manukrishnaap>@cluster0.8synd0q.mongodb.net/kisan?retryWrites=true&w=majority&appName=Cluster0/kisan');

let db=mongoose.connection
module.exports = db

