
var express = require('express'),
    app     = express();
	

var business = require('./business.js');
	
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/:id', business.getExpedientesByFrac);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});