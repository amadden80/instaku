// ----------------------
// ****** Modules! ******
// ----------------------

var express = require('express');
var router = express.Router();
var User = require('../models/user');



// ---------------------
// ****** Routes! ******
// ---------------------

router.post('/', function(req, res){
  var newUser = new User(req.body.user);
  newUser.save(function(err){
    res.redirect('/');
  });
});

router.get('/', function(req, res){
  if (req.user){
    User.find({}, 'username haikus', function(err, databaseUsers){
      res.json({users: databaseUsers});
    });
  } else {
    res.json({status: 302, desciption: 'Must log in...'});
  }
});

router.post('/token', function(req, res){
  console.log('Token Attempt!');
  User.findOne({username: req.body.username}, function(err, databaseUser){
    if (databaseUser){
      databaseUser.authenticate(req.body.password, function(err, isMatch){
        if(isMatch){
          databaseUser.setToken(err, function(){
            // res.cookie('token', databaseUser.token, {maxAge: 60*1000*5});
            res.json({description: 'success', token: databaseUser.token});
          });
        }
      });
    } else {
      res.json({description: 'No success', status: 302});
    }
  });
});



// ----------------------
// ****** Exports! ******
// ----------------------

module.exports = router;
