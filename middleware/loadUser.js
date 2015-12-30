// ----------------------
// ****** Modules! ******
// ----------------------

var User = require('../models/user');



// --------------------------------
// ****** Custom Middleware! ******
// --------------------------------

// ~~~ If token is found... load that user! ~~~
function loadUser(req, res, next){
  if (req.cookies.token){ // token found!
    User.findOne({token: req.cookies.token}, function(err, databaseUser){
      if (err) return err;
      req.user = databaseUser;
     next();
    });
  } else {  // no token found
    next();
  }
}



// ----------------------
// ****** Exports! ******
// ----------------------

module.exports = loadUser;
