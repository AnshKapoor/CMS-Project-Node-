const express = require('express');
const app = express();
const path = require('path');
const exphbars = require('express-handlebars');

app.engine('handlebars',exphbars({defaultLayout:'home'}));
app.set('view engine','handlebars');
app.use(express.static(path.join(__dirname,'./public')))
app.listen(4500,()=>{
    console.log('listening to 4500');
});

app.get('/',(req,res)=>{
    res.render('home/index');
})