var express = require("express");
var bodyParser=require("body-parser");
const mongoose= require("mongoose");
var app = express();
var i="";
var items=[];
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema = {
    name:String
}
const Item=mongoose.model("Item", itemSchema);
const item1 = new Item({
    name:"Yoga",
});
const item2 = new Item({
    name:"Excercise",
});
const item3 = new Item({
    name:"Blogging",
});
const d = [item1,item2,item3];
app.get("/",function(req, res)
{
    Item.find({},function(err,f){
        //console.log(f);
        if(f.length===0){
            Item.insertMany(d,function(err)
            {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log("Items Saved in Database.")
                }
            }); 
            res.redirect("/");                 
        }
        else{
            res.render("list",{newListItems:f});
        }
    })
})
app.post("/",function(req, res)
{
    const itemName = req.body.n;
    //items.push(i);
    //console.log(i);
    //res.render("list",{newListItems:items});
    //res.redirect('/');
    const item=new Item({
        name:itemName
    });
item.save();
});
app.post("/delete", function(req,res){
    console.log(req.body.checkbox);
});

app.listen(3000, function()
{
    console.log("Listening to port 3000");
}) 