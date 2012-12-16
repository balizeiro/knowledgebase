var mongoose = require('mongoose');

exports.makeConnection = function() {/*
	var opts = {
				host 		: 'localhost'
			  ,	port 		: '27017'
			  ,	username 	: ''
			  ,	password 	: ''
			  ,	database 	: 'knowledgebase'
			}, 
			connection = mongoose.createConnection();

	connection.open(opts.host, opts.database, opts.port, {user:opts.username, pass:opts.password})

	connection.on('error', console.error.bind(console, 'connection error:'));

	connection.once('open', function callback() {
	  console.log("Sucessfully connected to MongoDB");
	});*/

	mongoose.connect('mongodb://localhost/knowledgebase');
}
