//var connectorDB = require('mysqlLib.js');

var connector = {
 
  /*
  getAllFracs: function(callback){
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('CONNECTION error: ',err);
				return callback(err);
				
			} else {
				connection.query('SELECT * FROM frac', function(err, rows, fields) {
					if (err) {
						console.error(err);
						return callback(err);
					}
					callback(null, rows);
					connection.release();
				});
			}
		});
	
	},*/
	getAll: function() {
    var allProducts = data; // Spoof a DB call
    return allProducts;
  },
	
	/*
	getAllFracs: function(callback){
		mysqlLib.getConnection(function(err, mclient) {
			mclient.query('SELECT * FROM frac', function(err, rows, fields) {
						if (err) {
							console.error(err);
							
							callback(null,
								 err.code
								);
						}
						callback(null,
								 rows
								);
						mclient.release();
					});
		});
	};*/
};

var data = [{
  name: 'product 1',
  id: '1'
}, {
  name: 'product 2',
  id: '2'
}, {
  name: 'product 3',
  id: '3'
}];
module.exports = connector;