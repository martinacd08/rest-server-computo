
var express = require('express'),
        app = express();
var business = require('./business.js');

app.use(function(req, res, next) {
    res.setTimeout(500000, function() {
        console.log('Request has timed out.');
        res.send(408);
    });

    next();
});

var port = (process.env.PORT || 5000);

app.set('port', (port));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/cetys'));
app.use(express.static(__dirname + '/UI'));
app.use(express.static(__dirname + '/UI/assets'));

/*
 app.all('*', function(req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
 res.header('Access-Control-Allow-Headers', 'Content-Type');
 next();
 });
 */

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);

app.get('/cetys', function(req, res) {
    res.sendfile(__dirname + '/cetys/portfolio_two.html');
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/UI/index.html');
});


app.get('/fracs', business.getAllFracs);
app.get('/frac/:id', business.getFracByID);
app.get('/frac/:id/saldoCorriente', business.getSaldoCorrienteByFrac);
app.get('/frac/:id/saldoVencido', business.getSaldoVencidoByFrac);

app.get('/frac/:id/saldoRecuperado', business.getSaldoRecuperadoByFrac);

app.get('/frac/:id/expedientes/:page', business.getExpedientesByFrac);

app.get('/frac/:id/expediente/saldoCorriente', business.getExpSaldoCorrienteByFrac);


var io = require('socket.io').listen(app.listen(port), function() {
    console.log('Node app is running on port', port);
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('updateMov', function (data) {
        io.sockets.emit('updateMov', data);
    });
	
	
});