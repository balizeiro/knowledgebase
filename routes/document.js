var documentModel = require('../models/Document');

exports.new = function(req, res) {
  	res.render('document', { title: 'New document' });
};

exports.save = function(req, res) {
	var doc = new documentModel();
    doc.title = req.param('title');
    doc.body = req.param('body');

	doc.save(function(err) {
		if (!err) {
			documentModel.find({}, function(err, docs) {
				if (!err) { 
		 			res.render('dashboard', { 
		 				title: 'Dashboard',
		 				documents: docs
		 			});
		        }
		        else { 
		        	throw err;
		        }
		    });
		} else {
			throw err;
		}
	});
};