// Express (Web Server)
var express = require('express'),
    app = express();

// Mongoose (MongoDB connection)
var mongoose = require('mongoose');
mongoose.connect('mongodb://oseas-app:!oseas#@oseas.cf:27017/oseas');

// Passport (User authentication) & Other Middleware
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var authentication = require('./routes/authentication.js');
var cloudinary = require('cloudinary');
var multer = require('multer');

cloudinary.config({ 
  cloud_name: 'oseas', 
  api_key: '941999975855411', 
  api_secret: 'iGSgjGoULqkfOfl5mwHubF9XL2s' 
});

// Passport Uses
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({ 
	secret: process.env.SESSION_SECRET || 'metroid prime', 
	resave: false,
	saveUninitialized: false
}));
app.use(multer({ dest: './tmp/' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('app'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// API Routes

// GET: Check logged in
app.get('/api/user', function(req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
});

// POST: Log in
app.post('/api/user/login', passport.authenticate('local'), function(req, res) {
  console.log("Received login request");
  if (typeof req.user !== 'undefined')
    res.send(req.user); 
  else
    res.send(401);
});

// POST: Log out
app.post('/api/user/logout', function(req, res) {
  req.logOut();
  res.send(200);
});

// POST: Publish Product
app.post('/api/publish/product', function(req, res) {

  publish.publishEvent(req.body.name, req.body.category, req.body.price, req.body.description, 
      req.body.composition, req.body.care, req.body.modelHeight, req.body.modelSize,
      req.body.sizeSmall, req.body.sizeMedium, req.body.sizeLarge, req.body.image, function(status) {

    if (status) {
      res.send(200);
    }
    else {
      res.send(500);
    }
  });
});

// POST: Product Image
app.post('/api/publish/product/image', function(req, res) {

  console.log('Content-Type ' + req.headers['Content-Type']);
  console.log(JSON.stringify(req.files));

  res.send(200);

  /*
  cloudinary.uploader.upload(req.files.image, function(result) {
    console.log('Image upload result: ' + result.url);
    if (result) {
      res.send(result);
    }
    else {
      res.send(500);
    }
  });
*/
});

// POST: Publish Event
app.post('/api/publish/event', function(req, res) {

});


app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
