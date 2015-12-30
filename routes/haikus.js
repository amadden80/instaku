// ----------------------
// ****** Modules! ******
// ----------------------

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


// ----------------------
// ****** Routes! ******
// ----------------------

router.get('/', function(req, res){
  if (req.user){
    res.json({haikus: req.user.haikus });
  } else {
    res.json({status: 302, desciption: 'Must log in...'});
  }
});

router.post('/', function(req, res){
  if (req.user){
    var haikuNum = req.user.haikus.push(req.body.haiku);
    req.user.save(function(){
      var haiku = req.user.haikus[haikuNum-1];
      res.json({
        haiku: haiku
      });
    });
  } else {
    res.json({status: 302, desciption: 'Must log in...'});
  }
});


router.post('/:id', function(req, res){
  var id = req.params.id;
  if (req.user){
    User.findOne({'haikus._id': id}, function(err, databaseUser){
      var haiku = databaseUser.haikus.id(id);
      haiku.comments.push({
        username: req.user.username,
        body: req.body.comment.body
      });
      databaseUser.save(function(){
        res.json({
          haikus: [haiku]
        });
      })
    });
  } else {
    res.json({status: 302, desciption: 'Must log in...'});
  }
});



// ----------------------
// ****** Exports! ******
// ----------------------

module.exports = router;
