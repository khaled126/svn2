
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 1600;
app.use(bodyParser.json({limit: '5mb'}));


//use routes file
require('./routes/routes')(app);
app.listen(port);

#console.log('server is up and running...');
