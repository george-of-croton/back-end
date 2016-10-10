var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database;
var message = require('./controllers/message')
var auth = require('./controllers/auth');




app.use(bodyParser.json());
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorisation");
	next(); 

})

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
	if(!err){
		console.log("we are connected to mongo")			
		// GetMessages();
		database = db;
	}
})

app.get('/api/message', message.get) 

app.post('/api/message', message.post)

app.post('/auth/register', auth.register)


 
var server = app.listen(5000, function(){
	console.log("server is running on port", server.address().port)
});

