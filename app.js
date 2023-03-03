//express require
const express=require("express");
const app=express();

//path require
const path=require("path");

// mongose require
const mongoose=require("mongoose");

const Serie=require("./models/Serie.js")

//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/seriesDB")
.then(function(){
    console.log("DB Connected")
})
.catch(function(err){
    console.log(err)
})

//ejs setup
app.set("view engine","ejs");

//view folder path setup
app.set("views",path.join(__dirname,"views"))

//public folder path setup
app.use(express.static(path.join(__dirname,"public","js")))
app.use(express.static(path.join(__dirname,"public","css")))

app.get("/",function(req,res){
    res.render("index");
});

//http://localhost:3000/search route create ,
app.get("/search", async function(req,res){

    //request from server to Db
    const {q}=req.query;

    //data search in mongoDb
    const series= await Serie.find({name:{$regex:`^${q}`}});
    res.status(200).json(series);
    // res.send("you are my best friend");
})



app.listen(3000,function(){
    console.log("server is running at port 30000");
})