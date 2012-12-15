var userModel = require('../models/User');

exports.index = function(req, res){
	res.render('login', { title: 'Login', error: req.flash('error'), errors: [], messages: [] });
};

exports.do = function(req, res){	
	userModel.findOne({ username: req.param('username'), password: req.param('password') }, function(err, user) {
		if (user) {
			req.session.isAuthenticated = true;
			req.session.user = req.param('username');			
			res.redirect('/dashboard');
		} else {
			req.flash('error', ' wrong username/password.');			
			res.redirect('/login');			
		}
	});	
};