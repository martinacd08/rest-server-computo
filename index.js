
var express = require('express'),
        app = express();
var business = require('./business.js');


var session = require('express-session');
var bodyParser = require('body-parser');


app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var port = (process.env.PORT || 5000);



app.set('port', (port));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/cetys'));
app.use(express.static(__dirname + '/UI'));
app.use(express.static(__dirname + '/UI/assets'));


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);



var sess = null;


app.get('/',function(req,res){
	res.sendFile(__dirname + '/UI/login.html');
});

app.post('/login',function(req,res){
	
	if(req.body.pass == 'pass' & req.body.email== 'user'){
		sess=req.body;
		res.end("ok")
		
	}
	else
	{
		res.end("Error")
	}
});

app.get('/admin',function(req,res){

		if(sess !=null)
		{
			res.sendFile(__dirname + '/UI/admin.html');
		}
		else
		{
		
			res.redirect('/');
		}


});

app.get('/logout',function(req,res){
	sess = null;
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});

});














app.get('/cetys', function(req, res) {
    
	
	if(sess !=null)
		{
			res.sendFile(__dirname + '/cetys/portfolio_two.html');
		}
		else
		{
		
			res.redirect('/');
		}
});


app.get('/admin', function(req, res) {
	
    
	if(sess !=null)
		{
			res.sendFile(__dirname + '/UI/admin.html');
		}
		else
		{
		
			res.redirect('/');
		}
});


app.get('/fracs', business.getAllFracs);
app.get('/frac/:id', business.getFracByID);
app.get('/frac/:id/saldoCorriente', business.getSaldoCorrienteByFrac);
app.get('/frac/:id/saldoVencido', business.getSaldoVencidoByFrac);

app.get('/frac/:id/saldoRecuperado', business.getSaldoRecuperadoByFrac);

app.get('/frac/:id/expedientes/:page', business.getExpedientesByFrac);

app.get('/frac/:id/expediente/saldoCorriente', business.getExpSaldoCorrienteByFrac);


var io = require('socket.io').listen(app.listen(port), function() {
    console.log("Node app is running on port"+ port);
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('updateMov', function (data) {
        io.sockets.emit('updateMov', data);
    });
	
	
});