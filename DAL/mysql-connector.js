
	var mysql   = require('mysql');
	
		var connectionpool = mysql.createPool({
        host     : '192.185.4.105',
        user     : 'rigarcia_proyect',
        password : 'proyecto',
        database : 'rigarcia_proyecto'

    });

	
	
	module.exports.connectionpool = connectionpool;
