const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://manukrishnaap:tMOJ6kuNmujSZj3I>@cluster0.8synd0q.mongodb.net/kisan?retryWrites=true&w=majority&appName=Cluster0/kisan');

let db=mongoose.connection
module.exports = db

