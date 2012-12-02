/**
 * Opens a connection to MongoDB.
 *
 * @author lfreitas
 * @param {Object} mongoose instance
 * @return {Object} connection instance
 */
//teste
exports.makeConnection = function(mongoose) {
	var opts = {
				host : "localhost",
				port : "27017",
				username : "jdoe",
				password : "12345",
				database : "knowledgebase"
			}, 
			connection = mongoose.createConnection();

	connection.open(opts.host, opts.database, opts.port, {user:opts.username, pass:opts.password})

	connection.on('error', console.error.bind(console, 'connection error:'));

	connection.once('open', function callback () {
	  console.log("Sucessfully connected to MongoDB");
	});

	return connection;
}
