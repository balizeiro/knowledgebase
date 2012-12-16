var documentModel = require('../models/Document');

exports.new = function(req, res) {
  	res.render('document', { title: 'New document' });
};

exports.save = function(req, res) {
	var doc = new documentModel();
    doc.title = req.param('title');
    doc.body = req.param('body');
    doc.tags = req.param('tags');

	doc.save(function(err) {
		res.redirect('dashboard');
	});
};