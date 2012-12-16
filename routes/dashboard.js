var documentModel = require('../models/Document');
var tagModel = require('../models/Tag');

exports.index = function(req, res){
	documentModel.find({}, function(err, docs) {
		tagModel.find({}, function(err, tags) {
 			res.render('dashboard', { 
 				title: 'Dashboard',
 				documents: docs,
 				tags: tags
 			});
 		});
    });
};