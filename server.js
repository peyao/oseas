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
var cloudinary = require('cloudinary');
var multer = require('multer');
var fs = require('fs');
var sendgrid = require('sendgrid')('oseas', '!oseas-app#1');

var authentication = require('./routes/authentication.js');
var publish = require('./routes/publish.js');
var content = require('./routes/content.js');

cloudinary.config({ 
  cloud_name: 'oseas', 
  api_key: '941999975855411', 
  api_secret: 'iGSgjGoULqkfOfl5mwHubF9XL2s' 
});

// Passport Uses
app.use(cookieParser());
app.use(bodyParser.json({ strict: false }));
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
// GET: Retrieve all products
app.get('/api/product', function(req, res) {
  content.getAllProducts(function(products) {
    if (products)
      res.send(products);
    else
      res.send(500);
  });
});

// GET: Retrieve a specific product
app.get('/api/product/:productName', function(req, res) {
  content.getProduct(req.params.productName, function(product) {
    if (product) {
      res.send(product);
    }
    else {
      res.send(400);
    }
  });
});

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

  console.log(req.body);

  publish.publishProduct(req.body.name, req.body.category, req.body.price, req.body.description, 
      req.body.composition, req.body.care, req.body.modelHeight, req.body.modelSize,
      req.body.sizeSmall, req.body.sizeMedium, req.body.sizeLarge,
      req.body.mainImage, req.body.secondaryImages, function(status) {

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

  //res.send(req.files.file);
  cloudinary.uploader.upload(req.files.file.path, function(result) {
    console.log('Image upload result: ' + result.url);
    fs.unlink(req.files.file.path, function(err) {
      if (err) throw err;

      if (result) {
        res.send(result);
      }
      else {
        res.send(500);
      }
    });
  });
});

// POST: Publish Event
app.post('/api/publish/event', function(req, res) {

});

// POST: Send email to Oseas
app.post('/api/order', function(req, res) {

  console.log('Sending email to oseas from ' + req.body.order.email);

  var email = new sendgrid.Email();

  email.addTo('oseasapp@yahoo.com');
  email.setFrom(req.body.order.email);
  email.setSubject('You received an order from oseas.cf');
  email.setHtml("" +
    '<p><b>Order from: </b>' + req.body.order.email + '</p>' + 
    '<p><b>Name: </b>' + req.body.order.firstName + ' ' + req.body.order.lastName + '</p>' +
    '<p><b>Phone: </b>' + req.body.order.phone + '</p><br>' +
    '<p><b>Product Name: </b>' + req.body.order.productName + '</p>' +
    '<p><b>Size: </b>' + req.body.order.size + '</p>' +
    '<p><b>Quantity: </b>' + req.body.order.quantity + '</p><br>' +
    '<p><b>Special Instructions: </b><br>' + req.body.order.message + '</p>' +

  "");

  sendgrid.send(email);
  res.send(200);
});


app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
