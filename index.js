
var express = require('express'),
    app     = express();
	

var products = require('./products.js');
	
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/:id', products.getSaldoCorriente);




app.get('/', function(req,res){
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT * FROM frac', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});