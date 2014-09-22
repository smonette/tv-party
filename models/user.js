var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
var passport = require("passport");
var passportLocal = require("passport-local");


module.exports = function (sequelize, DataTypes){

    var User = sequelize.define('user',{
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type:DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    }, //close the first opening bracket after user()

    {
    classMethods: {
       encryptPass: function(password) {
        var hash = bcrypt.hashSync(password, salt);
        return hash;
      },
      comparePass: function(userpass, dbpass) {
      // don't salt twice when you compare....watch out for this
        return bcrypt.compareSync(userpass, dbpass);
    },
      createNewUser:function(username, email, password, err, success ) {
        if(password.length < 6) {
          err({message: "Password should be more than six characters"});
        }
        else{
        User.create({
            username: username,
            email: email,
            password: User.encryptPass(password)
          }).error(function(error) {
            console.log(error);
            if(error.email){
              err({message: 'Your email should be at least 6 characters long', email: email});
            }
            else{
              err({message: 'An account with that email already exists', email: email});
              }
          }).success(function(user) {
            success({message: 'Account created, please log in now'});
          });
        }
      }

    } // close classMethods

  } //close classMethods outer




  ) //close define user

  passport.use(new passportLocal.Strategy({
    // must keep as usernameField
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // passes the request callback to the param
  },
    function(req, email, password, done) {
      // find a user in the db
      User.find({
        where: {
          email: email
        }
      })
      // when thats done

      // done(err)             when we screwed up
      // done(null, false)     when we did it right, but the user messed up
      // done(null, user)      when we did right, and so did the user.
      .done(function(error,user){
        if(error){
          console.log(error)
          return done(err)
        } if (user === null) {
          return done(null, false);
        } if((User.comparePass(password, user.password)) !== true) {
          return done(null, false );
        }
        done(null, user);
      })
    }));

  return User;

};

