var documentModel = require('../models/Document');

exports.index = function(req, res){
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
};