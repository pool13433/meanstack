var express = require('express');
var app = express();

/*
* Mongojs referrense :: https://github.com/mafintosh/mongojs
*/
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
/*
* // simple usage for a local db
* mongojs('mydb', ['mycollection'])
*/
//var db = mongojs('contactList',['contactList']);
var db = mongojs('contactList');

var contactList = db.collection('contactList')
/*
* mongodb handle 
*/
db.on('error', function (err) {
    console.log('database error', err)
})

db.on('ready', function () {
    console.log('database connected')
})


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
/*app.get('/',function(req,res){
	res.send("Hello World");
});*/

app.get('/contactDb',function(req,res){
	contactList.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});
app.get('/contactList/:id',function(req,res){
	var id = req.params.id;

	contactList.findOne({_id : mongojs.ObjectId(id)},function(err,docs){		
		res.json(docs);
	});
});
app.post('/contactList',function(req,res){
	console.log(req.body);
	contactList.insert(req.body,function(err,doc){
		res.json(doc);
	});
});
app.put('/contactList/:id',function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	contactList.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name:req.body.name,age: req.body.age,email: req.body.email}},
		new: true},function(err,doc){
			res.json(doc);
		});
});

app.delete('/contactList/:id',function(req,res){	
	var id  = req.params.id
	contactList.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/contactList',function(req,res){
	console.log(' echo json');
	var contactList = [{
		name : 'pool1',
		age : 99,
		email : 'pool@email.com'
	},	{
		name : 'pool2',
		age : 88,
		email : 'pool@email.com'
	},{
		name : 'pool3',
		age : 77,
		email : 'pool@email.com'
	}];
	res.json(contactList);
});



app.listen(3000);
console.log('Server is runnig on port 3000');