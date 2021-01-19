const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const bodyParser=require('body-parser');
const session=require('express-session');
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const urlencoded = bodyParser.urlencoded({ extended: false});

const con=require('../modules/database');
 
router.get('/typequery',(req,res)=>res.render('typequery'));

router.post('/typequery',function(req,res){
       con.query(req.body.query,(err,result)=>{
        console.log(result);
        if(err) throw err;
        res.render('result',{data: result});
    });
})

router.get('/result',(req,res)=>res.render('result'));


module.exports=router;