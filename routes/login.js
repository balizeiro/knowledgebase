/*
 * POST login
 */

var mongoose = require('mongoose');

exports.index = function(req, res){
	res.render('login', { title: 'Login', error: req.flash('error') });
};

exports.do = function(req, res){

	// Validate login
	var db = require("../db").makeConnection(mongoose)
	  , userSchema = new mongoose.Schema({
		    name: String,
		    password: String
		})
	  , User = db.model('user', userSchema);

	User.findOne({ name: req.param('username'), password: req.param('password') }, function(err, user) {
		// Authenticated user
		if (user) {
			req.session.isAuthenticated = true;
			req.session.user = req.param('username');
			mongoose.disconnect(function() { console.log("All connections closed sucessfully.")});
			res.redirect('/dashboard');

		// Invalid user
		} else {
			req.flash('error', ' wrong username/password.');
			mongoose.disconnect(function() { console.log("All connections closed sucessfully.")});
			res.redirect('/login');			
		}
	});	
};