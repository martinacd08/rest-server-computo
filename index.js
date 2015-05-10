
var express = require('express'),
    app     = express();
var business = require('./business.js');
	
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));




app.get('/fracs', business.getAllFracs);
app.get('/frac/:id', business.getFracByID);
app.get('/frac/:id/saldoCorriente', business.getSaldoCorrienteByFrac);
app.get('/frac/:id/saldoVencido', business.getSaldoVencidoByFrac);

app.get('/frac/:id/saldoRecuperado', business.getSaldoRecuperadoByFrac);

app.get('/frac/:id/expedientes', business.getExpedientesByFrac);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});