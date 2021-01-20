const express=require('express');
const router=express.Router();
const session=require('express-session');
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const connection=require('../modules/database');


//login page
router.get('/login',(req,res)=>res.render('login'));

//register page
router.get('/register',(req,res)=>res.render('register'));

//home page
router.get('/home', (req, res)=>res.render('home'));

//package page
router.get('/package',(req,res)=>
        res.render('package'));


//destination page
router.get('/destination',function(req,res){
    connection.query('select sname from states',(err,result)=>{
        if(err) throw err;
        res.render('destination',{data: result});
    });
})



//booking page
router.get('/bill',(req,res)=>res.render('bill'));

//logout page
router.get('/logout',(req,res)=>res.render('welcome'));

//booking page
router.post('/booking', (req, res)=>{
    ({bid,b_date,cid,aid,pid,no_of_ppl} = req.body);
    if(bid && b_date && cid && aid && pid && no_of_ppl){
            connection.query('Insert INTO booking VALUES (?, ?, ?, ?, ?, ?)', [bid,b_date,cid,aid,pid,no_of_ppl], (err, result)=>{
                if(err){
                    res.send('Didnt get booking');
                }else{
                   res.render('booking',{obj: result});
                }
            
            });
        }
            else{             
                res.send('Please enter all the details');
            }
        });


//Database
router.post('/login', (req, res)=>{
     email = req.body.email;
     password = req.body.password;
    if(email && password){
        connection.query('SELECT * FROM customer WHERE email = ? AND password = ?', [email, password], (err, result)=>{
            if(result.length > 0){
                req.session.loggedin = true;
                res.render('home',{data: result});
            }else{
                res.send("Incorrect email or password");
            }
        });
    }else{
        res.send('Please enter Email and Password!!');
    }

});

//register page
router.post('/register', (req, res)=>{
    ({name, password, age, address, email, gender, phone_no} = req.body);
    if(name && password && age && address && email && gender && phone_no){
        if(password.length > 3){
            connection.query('Insert INTO customer(name, password, age,address,email,gender,phone_no) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, password, age,address,email,gender,phone_no], (err, result)=>{
                if(err){
                    res.send({error: err.sqlMessage});
                }else{
                   res.redirect('/users/login');
                }
            });
        }else{
            res.send({error : "Password should be of atleast 3 characters"});
        }
    }else{
        res.send({error : "Please fill all the details"});
    }
});



router.post('/home',(req,res)=>{
    res.redirect('/users/package');
    res.redirect('/q1/qq');
})
 module.exports=router;
 
