var User = require('../models/user.js');
var passport = require('passport'), 
	LocalStrategy = require('passport-local').Strategy;

module.exports = passport.use(new LocalStrategy(
	function(username, password, done) {

		console.log("In authentication.js. " + username + ":" + password);
		User.findOne({ 'username': username, 'password': password }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username or password.' });
			}
      return done(null, user);
		});
	}
));

module.exports = passport.serializeUser(function(user, done) {
	done(null, user.username);
});

module.exports = passport.deserializeUser(function(username, done) {
	// Query DB
	User.findOne({'username': username}, function(err, user) {
		done(null, user);
	});
});

