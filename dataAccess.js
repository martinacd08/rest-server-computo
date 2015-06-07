
mysql   = require('mysql'),
    connectionpool = mysql.createPool({
        host     		: 	'192.185.4.105',
        user     		: 	'rigarcia_proyect',
        password 		: 	'proyecto',
        database 		: 	'rigarcia_proyecto',
		connectTimeout	:	'500000'

    });


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

module.exports.getSaldoCorrienteByFrac = function (id, cb) {
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

module.exports.getSaldoVencidoByFrac = function (id, cb) {
  connectionpool.getConnection(function(err, conn) {
    if (err){
		
       cb(err);
	}
    conn.query('select  SUM(movimientos.SaldoMov) AS SaldoVencido FROM movimientos where movimientos.CodFrac = '+id.toString()+' and  Cast(movimientos.FechaV as datetime) < curdate();',
               function(err, rows) {
      conn.release();
	  
      cb(err, rows);
    });
  });
};

module.exports.getSaldoRecuperadoByFrac = function (id, cb) {
  connectionpool.getConnection(function(err, conn) {
    if (err){
		
       cb(err);
	}
    conn.query('select  SUM(Importe) AS SaldoRecuperado FROM movimientos where movimientos.CodFrac = '+id.toString()+' and  Cast(SaldoMov as decimal) = 0.0;',
               function(err, rows) {
      conn.release();
	  
      cb(err, rows);
    });
  });
};

module.exports.getExpedientesByFrac = function (id,page, cb) {
  connectionpool.getConnection(function(err, conn) {
    if (err){
		
       cb(err);
	}
    conn.query(
"SELECT Cont.Exp,  Cont.Titular, resultado.FechaPag, V.vencido, IFNULL(C.corriente,0) as corriente\n" +
"FROM contratos as Cont \n" +
"JOIN (SELECT pg.codFrac, Max(pg.fechaPag) FechaPag, pg.Exp FROM pagmov as pg \n" +
"GROUP BY  pg.Exp) as resultado \n" +
"ON  resultado.Exp = Cont.Exp \n" +
"\n" +
" JOIN (SELECT MV.CodFrac, MV.Exp, SUM(MV.SaldoMov) vencido \n" +
"        FROM movimientos MV\n" +
"        WHERE MV.CodFrac = "+id.toString()+"\n" +
"        and cast( MV.FechaV as date) < curdate()\n" +
"        GROUP BY MV.Exp) as V \n" +
"        ON  V.Exp = Cont.Exp\n" +
"        \n" +
"left JOIN (SELECT MV.CodFrac, MV.Exp, SUM(MV.SaldoMov) corriente \n" +
"        FROM movimientos MV\n" +
"        WHERE MV.CodFrac = "+id.toString()+"\n" +
"        and cast( MV.FechaV as date) > curdate()\n" +
"        GROUP BY MV.Exp) as C \n" +
"        ON  C.Exp = Cont.Exp\n" +
"WHERE Cont.CodFrac = "+id.toString()+"\n" +
"\n" +
"GROUP BY Cont.Exp LIMIT "+page*30+", 30;",
               function(err, rows) {
      conn.release();
	  
      cb(err, rows);
    });
  });
};


module.exports.getExpSaldoCorrienteByFrac = function (id, cb) {
  connectionpool.getConnection(function(err, conn) {
    if (err){
		
       cb(err);
	}
    conn.query(
"SELECT  MV.Exp, SUM(MV.SaldoMov)  corriente \n" +
"FROM movimientos MV\n" +
"WHERE CodFrac = "+id.toString()+"\n" +
"and cast( MV.FechaV as date) >= curdate()\n" +
"GROUP BY MV.Exp;",
               function(err, rows) {
      conn.release();
	  
      cb(err, rows);
    });
  });
};
