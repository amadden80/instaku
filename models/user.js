// ----------------------
// ****** Modules! ******
// ----------------------
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');


// ----------------------
// ****** Schemas! ******
// ----------------------

// ~~~ Comment! ~~~
var CommentSchema = mongoose.Schema({
  body: {type: String},
  username: {type: String}
});


// ~~~ Haiku! ~~~
var HaikuSchema = mongoose.Schema({
  body: {type: String},
  comments: [CommentSchema]
});


// ~~~ User! ~~~
var UserSchema = mongoose.Schema({
  username: {type: String},
  password: {type: String},
  token: {type: String},
  haikus: [HaikuSchema]
});



// ----------------------------
// ****** Model Methods! ******
// ----------------------------

// ~~~ Pre Save Hook! ~~~
UserSchema.pre('save', function(next){
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  return next();
});

// ~~~ Set new Token ~~~
UserSchema.methods.setToken = function(err, done){
  var scope = this;
  crypto.randomBytes(256, function(err, buf) {
    if (err) return done(err)
    scope.token = buf;
    scope.save(function(err){
      if (err) return done(err);
      done();
    });
  });
};

// ~~~ Check is password attempt is correct ~~~
UserSchema.methods.authenticate = function(passwordTry, callback) {
  bcrypt.compare(passwordTry, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};



// ----------------------
// ****** Exports! ******
// ----------------------

module.exports = mongoose.model('User', UserSchema);
