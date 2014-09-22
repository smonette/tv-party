var express = require('express'),
    db = require('./models/index.js'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    passport= require("passport"),
    pasportLocal = require("passport-local"),
    OAuth = require('oauth'),
    cookieParser = require("cookie-parser"),
    cookieSession = require("cookie-session"),
    _ = require('lodash');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

app.use(methodOverride("_method"));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}) );
app.use( cookieSession({
    secret: 'thisismysecretkey',
    name: 'cookie created by steph',
    maxage: 60360000
}) );

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.TV_TWITTER_KEY,
  process.env.TV_TWITTER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);


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


//twitter

var retreieveTweets = function(requestUrl, callback) {
  var allTweets;
  oauth.get(requestUrl, null, null, function(e, data, res){
    allTweets = JSON.parse(data);
    callback(allTweets);
  });
}

//CRUD
// POSTS FOR SIGN UP, LOGIN, LOGOUT, & EDIT PROFILE
app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/login')
});

app.post('/create', function(req,res){
  // have to call my create new user functions
  db.user.createNewUser(req.body.username,req.body.email, req.body.password,
    function(err){
      res.render("site/index", { message: err.message, email: req.body.email, shows:[]});
    },
    function(success){
      res.redirect('/');
    });

});

app.post('/login', passport.authenticate('local', {
  //no req and res. we dont need to because passport is doing the heavy lifting with local
  successRedirect: '/',
  failureRedirect: '/login'
  // failureFlash: true
}));


app.get('/', function(req,res){
  db.show.findAll()
    .success(function(shows){
      res.render('site/index', {shows: shows})
    })
});

app.get('/about', function(req,res){
  res.render('site/about')
});

// app.get('/shows/:id', function (req, res) {

//     db.show.find({
//       where: {
//         id: req.params.id
//       }
//     })
//     .success(function(foundShow) {
//        var url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + foundShow.twitter_handle + "&count=6";
//             retreieveTweets(url, function(allTweets){

//                   console.log("ALL TWEETS!!! appjs: ");
//                   console.log(allTweets);

//                   console.log("ALL TWEETS[0]!!! appjs: ");
//                   console.log(allTweets[0]);
//       res.render("site/show", {show: foundShow, tweets: allTweets});
//                });
//     })

// });




app.get('/shows/:id', function (req, res) {

  db.show.find({
    where: {
      id: req.params.id
    }
  }) .success( function(foundShow){

      var url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + foundShow.twitter_handle + "&count=6";
      retreieveTweets(url, function(allTweets){

            console.log("ALL TWEETS!!! appjs: ");
            console.log(allTweets);

            console.log("ALL TWEETS[0]!!! appjs: ");
            console.log(allTweets[0]);


            res.render("site/show",
            { tweets: allTweets,
              show: foundShow,
            });
         });
      });


});





// connect to socket
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log("local hosties");
});

module.exports = app;