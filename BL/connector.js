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
	getAll: function(req, res) {
    var allPro = arr; // Spoof a DB call
    res.json(allPro);
  }
	
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

var arr = [{
  name: 'product 1',
  id: '1'
}, {
  name: 'product 2',
  id: '2'
}, {
  name: 'product 5',
  id: '000'
}];
module.exports = connector;