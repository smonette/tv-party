var express = require('express'),
    db = require('./models/index.js'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    passport= require("passport"),
    pasportLocal = require("passport-local"),
    cookieParser = require("cookie-parser"),
    cookieSession = require("cookie-session"),
    _ = require('lodash'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.use(methodOverride("_method"));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}) );
app.use( cookieSession({
    secret: 'thisismysecretkey',
    name: 'cookie created by steph',
    maxage: 60360000
}) );

// get passport started
app.use(passport.initialize());
app.use(passport.session());



app.get('/', function(req,res){
    res.render("site/index", {message:null});
});


app.listen(process.env.PORT || 3000, function(){
  console.log("local hosties");
});