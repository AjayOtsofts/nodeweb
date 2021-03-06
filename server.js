const express = require('express');
const hbs =require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}---${req.method}--${__dirname+req.path}`;
  fs.appendFile('server.log',log + '\n', (err)=>{
    if(err){
      console.log('unable to write log');
    }
  });
  //console.log(`${now}---${req.method}--${__dirname+req.path}`);
  next();
});
hbs.registerHelper('year', (type) =>{
  if(type === "Year"){
  return new Date().getFullYear();
}
else {
  return new Date().toString();
}
});

app.get('/', (req, res) =>{
   res.render('welcome.hbs',{
     pagetitle: "Welcome to nodejs project"
   });
});
app.get('/about', (req, res) =>{
res.render('about.hbs', {
  title: 'About Page',
  Description: 'Welcome to About Page'
});

});

app.get('/home', (req,res) => {
res.send('Welcome to home page');
});

app.get('/homenew', (req,res) => {
res.send({
  errorMessage: 'Unable to handel request'

});

});
app.listen(port, () => {
 console.log(`server is now running on port: ${port}`);

});
