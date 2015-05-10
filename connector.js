
mysql   = require('mysql'),
    connectionpool = mysql.createPool({
        host     : '192.185.4.105',
        user     : 'rigarcia_proyect',
        password : 'proyecto',
        database : 'rigarcia_proyecto'

    });


module.exports.getFracByID = function (id, cb) {
  connectionpool.getConnection(function(err, conn) {
    if (err){
		
       cb(err);
	}
    conn.query("select * from frac where CodFrac = ?",[id],
               function(err, rows) {
      conn.release();
      cb(err, rows);
    });
  });
};

module.exports.getAllFracs = function (id, cb) {
  connectionpool.getConnection(function(err, conn) {
    if (err){
		
       cb(err);
	}
    conn.query("select * from frac",
               function(err, rows) {
      conn.release();
      cb(err, rows);
    });
  });
};

module.exports.getSaldoCorriente = function (id, cb) {
  connectionpool.getConnection(function(err, conn) {
    if (err){
		
       cb(err);
	}
    conn.query('select  SUM(movimientos.SaldoMov) AS SaldoCorriente FROM movimientos where movimientos.CodFrac = '+id.toString()+' and  Cast(movimientos.FechaV as datetime) >= curdate();',
               function(err, rows) {
      conn.release();
	  
      cb(err, rows);
    });
  });
};

