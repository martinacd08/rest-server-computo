
mysql = require('mysql'),
        connectionpool = mysql.createPool({
            host: '192.185.4.105',
            user: 'rigarcia_proyect',
            password: 'proyecto',
            database: 'rigarcia_proyecto',
            connectTimeout: '500000'

        });


module.exports.getAllFracs = function(id, cb) {
    connectionpool.getConnection(function(err, conn) {
        if (err) {

            cb(err);
        }
        conn.query("select * from frac",
                function(err, rows) {
                    conn.release();
                    cb(err, rows);
                });
    });
};

module.exports.getFracByID = function(id, cb) {
    connectionpool.getConnection(function(err, conn) {
        if (err) {

            cb(err);
        }
        conn.query("select * from frac where CodFrac = ?", [id],
                function(err, rows) {
                    conn.release();
                    cb(err, rows);
                });
    });
};

module.exports.getSaldoCorrienteByFrac = function(id, cb) {
    connectionpool.getConnection(function(err, conn) {
        if (err) {

            cb(err);
        }
        conn.query('select  SUM(movimientos.SaldoMov) AS SaldoCorriente FROM movimientos where movimientos.CodFrac = ' + id.toString() + ' and  Cast(movimientos.FechaV as datetime) >= curdate();',
                function(err, rows) {
                    conn.release();

                    cb(err, rows);
                });
    });
};

module.exports.getSaldoVencidoByFrac = function(id, cb) {
    connectionpool.getConnection(function(err, conn) {
        if (err) {

            cb(err);
        }
        conn.query('select  SUM(movimientos.SaldoMov) AS SaldoVencido FROM movimientos where movimientos.CodFrac = ' + id.toString() + ' and  Cast(movimientos.FechaV as datetime) < curdate();',
                function(err, rows) {
                    conn.release();

                    cb(err, rows);
                });
    });
};

module.exports.getSaldoRecuperadoByFrac = function(id, cb) {
    connectionpool.getConnection(function(err, conn) {
        if (err) {

            cb(err);
        }
        conn.query('select  SUM(Importe) AS SaldoRecuperado FROM movimientos where movimientos.CodFrac = ' + id.toString() + ' and  Cast(SaldoMov as decimal) = 0.0;',
                function(err, rows) {
                    conn.release();

                    cb(err, rows);
                });
    });
};

module.exports.getExpedientesByFrac = function(id, page, cb) {
    connectionpool.getConnection(function(err, conn) {
        if (err) {

            cb(err);
        }
        var limite = 7 - page.length;
        for(var x=0; x++ ; x<limite){
            page = "0"+page;
        }
        conn.query("CALL rigarcia_proyecto.obtener_expedientes('" + id.toString() + "','" + page * 30 + "');",
                function(err, rows) {
                    conn.release();

                    cb(err, rows);
                });
    });
};


module.exports.getExpSaldoCorrienteByFrac = function(id, cb) {
    connectionpool.getConnection(function(err, conn) {
        if (err) {

            cb(err);
        }
        conn.query(
                "SELECT  MV.Exp, SUM(MV.SaldoMov)  corriente \n" +
                "FROM movimientos MV\n" +
                "WHERE CodFrac = " + id.toString() + "\n" +
                "and cast( MV.FechaV as date) >= curdate()\n" +
                "GROUP BY MV.Exp;",
                function(err, rows) {
                    conn.release();

                    cb(err, rows);
                });
    });
};
