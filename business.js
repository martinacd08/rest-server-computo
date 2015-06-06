var dataAccess = require('./dataAccess.js');
mysql   = require('mysql'),
    connectionpool = mysql.createPool({
        host     : '192.185.4.105',
        user     : 'rigarcia_proyect',
        password : 'proyecto',
        database : 'rigarcia_proyecto'

    });


	
var business = {
 
	getAllFracs: function(req, res,next) {
		dataAccess.getAllFracs(0,function(err, rows) {
			res.json(rows);
		});
	},
 
	getFracByID: function(req, res,next) {
		dataAccess.getFracByID(req.params.id,function(err, rows) {
			res.json(rows);
		});
	},
 
	getSaldoCorrienteByFrac: function(req, res,next) {
		dataAccess.getSaldoCorrienteByFrac(req.params.id,function(err, rows) {
			res.json(rows);
		});
	},
  
	getSaldoVencidoByFrac: function(req, res,next) {
		dataAccess.getSaldoVencidoByFrac(req.params.id,function(err, rows) {
			res.json(rows);
		});
	},
  
	getSaldoRecuperadoByFrac: function(req, res,next) {
		dataAccess.getSaldoRecuperadoByFrac(req.params.id,function(err, rows) {
			res.json(rows);
		});
	},
	getExpedientesByFrac: function(req, res,next) {
		dataAccess.getExpedientesByFrac(req.params.id,function(err, rows) {
			res.json(rows);
		});
	},
	getExpSaldoCorrienteByFrac: function(req, res,next) {
		dataAccess.getExpSaldoCorrienteByFrac(req.params.id,function(err, rows) {
			res.json(rows);
		});
	}
	
};

module.exports = business;