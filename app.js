const express = require('express');
const app = express();
const path = require('path');
const exphbars = require('express-handlebars');
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cms',{ useNewUrlParser: true }).then((db)=>{
    console.log('Connected mongo');
}).catch(error=>console.log(error));
app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.engine('handlebars',exphbars({defaultLayout:'home'}));
app.set('view engine','handlebars');
app.use(express.static(path.join(__dirname,'./public')));
app.listen(4500,()=>{
    console.log('listening to 4500');
});

