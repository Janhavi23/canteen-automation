const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session');
const mysql=require('mysql');

const app=express();

//database
const db=require('./modules/database');


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//BodyParser
app.use(express.urlencoded({ extended: false}))

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/queries',require('./routes/queries'));
app.use('/travelagents',require('./routes/travelagents'));

const PORT = process.env.PORT || 9000;


app.listen(PORT, console.log(`Server started on port ${PORT}`));