
mysql   = require('mysql'),
    connectionpool = mysql.createPool({
        host     : '192.185.4.105',
        user     : 'rigarcia_proyect',
        password : 'proyecto',
        database : 'rigarcia_proyecto'

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

module.exports.getExpedientesByFrac = function (id, cb) {
  connectionpool.getConnection(function(err, conn) {
    if (err){
		
       cb(err);
	}
    conn.query('SELECT Cont.Exp,  Cont.Titular, resultado.FechaPag, V.vencido, C.corriente FROM contratos as Cont JOIN (SELECT pg.codFrac, Max(pg.fechaPag) FechaPag, pg.Exp FROM pagmov as pg WHERE pg.CodFrac = '+id.toString()+' GROUP BY pg.CodFrac, pg.Exp) as resultado ON resultado.CodFrac = Cont.CodFrac and resultado.Exp = Cont.Exp JOIN (SELECT MV.CodFrac, MV.Exp, SUM(MV.SaldoMov) vencido FROM movimientos MV WHERE MV.CodFrac = '+id.toString()+' and cast( MV.FechaV as date) < curdate() GROUP BY MV.CodFrac, MV.Exp) V ON V.CodFrac = Cont.CodFrac and V.Exp = Cont.Exp JOIN (SELECT MV.CodFrac, MV.Exp, SUM(MV.SaldoMov) corriente FROM movimientos MV WHERE MV.CodFrac = '+id.toString()+' and cast( MV.FechaV as date) >= curdate() GROUP BY MV.CodFrac, MV.Exp) C ON C.CodFrac = Cont.CodFrac and C.Exp = Cont.Exp WHERE Cont.CodFrac = '+id.toString()+';',
               function(err, rows) {
      conn.release();
	  
      cb(err, rows);
    });
  });
};

