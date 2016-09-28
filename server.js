var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database;
var Message = mongoose.model('Message', {
	msg: String
});


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

app.get('/api/message', GetMessages)

app.post('/api/message', function(req, res){
	console.log(req.body);

	var message = new Message(req.body);
	console.log(message)
	message.save();
	res.status(200);
})

function GetMessages(req, res) {
	Message.find({}).exec(function(err, result){
		console.log(res);
		res.send(result);
	})
}
 
var server = app.listen(5000, function(){
	console.log("server is running on port", server.address().port)
});

