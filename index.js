const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');
const app = express();
app.use(cors());
var port = process.env.PORT || 4000;



app.get("/",function(req , res){
    console.log(req.body);
});



var server = app.listen(function(){
    console.log('192.168.0.13:'+port);
});
