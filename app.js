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
var request = require("request");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookie = require("cookie")
var atob = require("atob")


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

//imdb

// var retrieveImdb = function(url) {

// };

//CRUD
// POSTS FOR SIGN UP, LOGIN, LOGOUT, & EDIT PROFILE
app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/')
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
  failureRedirect: '/'
}));


app.get('/', function(req,res){
  console.log(req)
  db.show.findAll()
    .success(function(shows){
      username = req.user !== undefined ? req.user.username : "";
      res.render('site/index', {shows: shows, isAuthenticated: req.isAuthenticated(), username: username})
    })
});

app.get('/about', function(req,res){
  res.render('site/about', {isAuthenticated: req.isAuthenticated()})
});



//includes myImdb
// app.get('/shows/:id', function (req, res) {

//   db.show.find({
//     where: {
//       id: req.params.id
//     }
//   })
//   .success(function(foundShow){
//       var myImdb ="http://www.myapifilms.com/imdb?idIMDB=" + foundShow.imdb_id + "&format=JSON&lang=en-us&actors=S&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&actorActress=0&actorTrivia=0";
//       // var myImdb = "http://www.google.com"
//       request(myImdb, function(error, response, body){
//         var imdbData = JSON.parse(body)
//         if (!error && response.statusCode == 200) {
//           console.log(body) // Print the google web page.
//             var url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + foundShow.twitter_handle + "&count=5";

//           retreieveTweets(url, function(allTweets){

//             username = req.user !== undefined ? req.user.username : "";
//             res.render("site/show",
//               { tweets: allTweets,
//                 show: foundShow,
//                 isAuthenticated: req.isAuthenticated(),
//                 username: username,
//                 imdb: imdbData
//               }); // render
//             });//retreive tweets
//         }
//       })
//   })
// });




app.get('/shows/:id', function (req, res) {

  db.show.find({
    where: {
      id: req.params.id
    }
  })
  .success(function(foundShow){

          var url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + foundShow.twitter_handle + "&count=5";
          retreieveTweets(url, function(allTweets){

            username = req.user !== undefined ? req.user.username : "";
            res.render("site/show",
              { tweets: allTweets,
                show: foundShow,
                isAuthenticated: req.isAuthenticated(),
                username: username
              }); // render
            });//retreive tweets
        })
  });


// io.use(cookieSession({
//     secret: 'thisismysecretkey',
//     name: 'cookie created by steph',
//     maxage: 60360000
// }))

io.use(function(socket, next){
  console.log("Authenticating Req")
  console.log(x=cookie.parse(socket.request.headers.cookie));
  socket.request.session = JSON.parse(atob(x['cookie created by steph']))["passport"]
  db.user.find({
    where:
      {id: socket.request.session["user"]}
    })
  .success(function(user){
    console.log(user)
    socket.request.user = user
    next()
  })
  .error(function(error){
    next(error)
  })
})
// connect to socket
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log("\t\t\tSIGNED IN: CHATS")
    if(socket.request.user.name = username){
      msgObj = JSON.parse(msg)
      console.log("msgObj", msgObj)
      db.chat.create(msgObj)
      .success(function(chat){
        io.emit('chat message', msg);
      })

    } else {
      io.emit("error", "SignIn")
    }
    console.log("INCOMING MESSAGE"+ (new Array(50).join("*")))
    console.log("\t", arguments)
    //set the key value pair on redis
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log("local hosties");
});

module.exports = app;