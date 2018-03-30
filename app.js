var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
prompt = require('prompt');

//app conf
mongoose.connect("mongodb://localhost/do_it");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method")),
prompt.start();


//schema conf
var choreSchema = new mongoose.Schema({
    body: String,
    created: {type: Date, default: Date.now}
});


var Chore = mongoose.model("Chore", choreSchema);
        
//routes
app.get("/", function(req,res){
    res.redirect("/chores");
});

app.get("/chores", function(req,res){
    Chore.find({}, function(err, chores){
        if(err){
            console.log(err);
        }else{
            res.render("index", {chores: chores});
        }
    });
});

//new route
app.get("/chores/new", function(req,res){
    res.render("new");
});
app.post("/chores", function(req,res){
    Chore.create(req.body.chore, function(err, newChore){
        if(err){
            res.render("new");
        }else{
            res.redirect("/chores");
        }
    });
});


app.listen(3001, '127.0.0.1', function(){
    console.log("Just do it! is served");
});