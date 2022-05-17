var express = require('express');
var app = express();
var path = require('path');
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser') 
var env = require('dotenv');
var authRoute = require('./app/routes/auth.js')(app,passport);
require('./app/config/passport/passport.js')(models.use,passport)



//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
env.config();
app.set('views', path.join(__dirname, 'app','views'));
app.set('view engine', 'ejs');
// For Passport

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions

 //Models
var models = require("./app/models/index");
 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});


app.get('/', function(req, res) {
 
    res.send('Welcome to Passport with Sequelize');
 
});
 

app.listen(5000, function(err) {
 
    if (!err)
        console.log("Site is live");
    else console.log(err)
 
});