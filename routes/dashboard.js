/*
 * GET dashboard
 */

 var mongoose = require('mongoose');

exports.index = function(req, res){

	var db = require("../db").makeConnection(mongoose)
	  , docSchema = new mongoose.Schema({
		    title: String,
		    body: String
		})
	  , Doc = db.model('documents', docSchema);

	// Get all documents	
	Doc.find({}, function(err, docs) {
		if (!err) { 
			console.log(docs);
 			res.render('dashboard', { 
 				title: 'Dashboard',
 				documents: JSON.stringify(docs)
 			});
        }
        else { 
        	throw err;
        }
    });


};