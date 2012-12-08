/*
 * Document
 */

 var mongoose = require('mongoose');

exports.new = function(req, res) {
  	res.render('document', { title: 'New document' });
};


exports.save = function(req, res) {

	var db = require("../db").makeConnection(mongoose)
	  , docSchema = new mongoose.Schema({
		    title: String,
		    body: String
		})
	  , Doc = db.model('documents', docSchema)
	  , newDoc = new Doc({ 
	  		title: req.param('title'), 
	  		body: req.param('body')});

	// Save the new document
	newDoc.save(function(err) {
		if (!err) {
			// Get all documents that will be rendered in dashboard
			Doc.find({}, function(err, docs) {
				if (!err) { 
					mongoose.disconnect(function() { console.log("All connections closed sucessfully.")});
		 			res.render('dashboard', { 
		 				title: 'Dashboard',
		 				documents: JSON.stringify(docs)
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