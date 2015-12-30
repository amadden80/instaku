// -----------------------------------
// ****** Modules & Middleware! ******
// -----------------------------------

// Exress Module! - Web-Application Framework
var express = require('express');
var app = express();

// Mongoose! - Load and connect to our mongo database
var mongoPath = process.env.MONGOLAB_URI || 'mongodb://localhost/instaku'
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

// Let's use EJS for our template rendering!
app.set('view engine', 'ejs');

// Allow ANYTHING in './public' to be servered with manual routing
app.use(express.static('./public'));

// Morgan Module! - Reqest Logging
var morgan = require('morgan');
app.use(morgan('dev'));

// Cookie Parser! - Parse the cookies in the request!
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Body Parser! - Parse request body!
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Custom Middelware! - If a user token is included... find the user
var loadUser = require('./middleware/loadUser');
app.use(loadUser);



// ---------------------
// ****** Routing ******
// ---------------------

// Haikus API:  `/api/haikus`
var haikus = require('./routes/haikus');
app.use('/api/haikus', haikus);

// Users API:  `/api/users`
var users = require('./routes/users');
app.use('/api/users', users);

// Index View route:  `/`
var index = require('./routes/index');
app.use('/', index);



// ---------------------
// ****** Listen! ******
// ---------------------

// Let's see if there is an environment variable for port
// If not!... let's just use 8080
var port = process.env.PORT || 8080;

app.listen(port,function(){
  console.log('...listening');
});
