var userModel = require('../models/User');
/*
exports.index = function(req, res){
	res.render('index', { title: 'Home', messages: [], errors: [] });
};
*/

exports.signup = function(req, res){
    res.render('signup', { title: 'Sign Up' });
};

exports.users = function(req, res){
    userModel.find({},function(err, docs){
        res.render('users', { title: 'Users List', users: docs });
    });
};

exports.index_post = function(req, res){
    user = new userModel();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    
    user.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
            messages.push("Thank you for you new usership !");
        }
        else {
            console.log('Error !');
            errors.push("At least a mandatory field has not passed validation...");
            console.log(err);
        }
        res.render('login', { title: 'Login', messages: messages, errors: errors });
    });
};