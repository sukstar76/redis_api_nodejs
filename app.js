const express = require ('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const notify =require('./route/notify');
const redis = require('redis');
const rclient =redis.createClient(6379,'127.0.0.1');
const cors = require('cors');


rclient.on('error',function(err){
    console.log('Error'+err);
})



var subpath_v1 = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/v1", subpath_v1);
subpath_v1.use(cors());
subpath_v1.use(bodyParser.urlencoded({ extended: false }));
subpath_v1.use(bodyParser.json());
subpath_v1.use(function(req,res,next){
    req.cache =rclient;
    next();
})
subpath_v1.use('/notify',notify);


http.createServer(app).listen(8888);



