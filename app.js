var express = require("express");
var bodyParser=require("body-parser");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get("/",function(req, res)
{
    //res.send("Hey Guys")
    res.render("list");
})
app.post("/",function(req, res)
{
    var i = req.body.n;
})

app.listen(3000, function()
{
    console.log("Listening to port 3000");
})