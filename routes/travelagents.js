const express=require('express');
const router=express.Router();
const session=require('express-session');
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const connection=require('../modules/database');


router.get('/agents',function(req,res){
    connection.query('Select * from travelagent',(err,result)=>{
        if(err) throw err;
        res.render('agents',{data: result});
    });
})


module.exports=router;