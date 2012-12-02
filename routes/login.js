/*
 * POST login
 */

var mongoose = require('mongoose');

exports.index = function(req, res){

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
			res.redirect('/dashboard');

		// Invalid user
		} else {
			res.redirect('/');			
		}
	});

	mongoose.disconnect(function() { console.log("All connections closed sucessfully.")});
	
};