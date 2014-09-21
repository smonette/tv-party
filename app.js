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


// prepare our serialize functions
passport.serializeUser(function(user, done){
  console.log("SERIALIZED JUST RAN!");
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log("DESERIALIZED JUST RAN!");
  db.user.find({
      where: {
        id: id
      }
    })
    .done(function(error,user){
      done(error, user);
    });
});

//CRUD
// POSTS FOR SIGN UP, LOGIN & EDIT PROFILE

app.post('/create', function(req,res){
  // have to call my create new user functions
  db.user.createNewUser(req.body.username,req.body.email, req.body.password,
    function(err){
      res.render("site/index", { message: err.message, email: req.body.email});
    },
    function(success){
      res.render('site/index', {message: "Success! ", username:req.body.username});
    });

});

app.post('/login', passport.authenticate('local', {
  //no req and res. we dont need to because passport is doing the heavy lifting with local
  successRedirect: '/home',
  failureRedirect: '/login',
  // failureFlash: true
}));


app.get('/', function(req,res){
  db.show.findAll()
    .success(function(shows){
      res.render('site/index', {shows: shows})
    })
});


app.listen(process.env.PORT || 3000, function(){
  console.log("local hosties");
});

module.exports = app;