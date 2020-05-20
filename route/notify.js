let express = require('express');
let router = express.Router();
let JSON= require('JSON');


router.get('/get/:key', (req,res,next)=>{
    var key =req.params.key;
    req.cache.get(key,function(err,result){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        console.log(result);
        res.json(result);
    });
})

router.post('/create',(req,res,next)=>{
    console.log(req.body);
    var key = req.body.key;
    var value = req.body.value;
    req.cache.set(key,value,function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
            return;
        }
        console.log(result);
        res.json(result);
    });
})


module.exports = router;