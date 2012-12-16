var tagModel = require('../models/Tag');

exports.new = function(req, res) {
  	res.render('tag', { title: 'New tag' });
};

exports.save = function(req, res) {
	var tag = new tagModel();
    tag.name = req.param('name');
    tag.description = req.param('description');

	tag.save(function(err) {
		res.redirect('dashboard');
	});
};