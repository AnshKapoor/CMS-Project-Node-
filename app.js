const express = require('express');
const app = express();
const path = require('path');
const exphbars = require('express-handlebars');
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cms',{ useNewUrlParser: true }).then((db)=>{
    console.log('Connected mongo');
}).catch(error=>console.log(error));
// Using express file
app.use(upload());

// Setting up body Parser 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Method override
app.use(methodOverride('_method'));
app.use(session({
    secret:'ansh123',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_message = req.flash('success_message');
    next();
});
// Routes
app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
const {select,GenerateTime} = require('./helper/handlebars-helpers')
app.engine('handlebars',exphbars({defaultLayout:'home',helpers:{select:select,GenerateTime:GenerateTime}}));
app.set('view engine','handlebars');
app.use(express.static(path.join(__dirname,'./public')));
app.listen(4500,()=>{
    console.log('listening to 4500');
});

