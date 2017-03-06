var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var redis = require("redis")

var client = redis.createClient({host:"192.168.152.129", port:6379});

app.set('view engine', 'ejs');

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res, next) {
  return res.render("server")
});

app.get('/messages', getAllMessages);
app.post('/new_message', createMessage);

function getAllMessages(req, res) {
  client.lrange('list_messages', 0, -1, function(err, reply){
    var messages = reply.map(function(message) {
      return JSON.parse(message)
    })
    res.send(messages);
  });
}

function createMessage(req, res) {
  var message = {"email": req.body.email, "message": req.body.message};
  client.rpush('list_messages', JSON.stringify(message), function(err, reply){
    res.json(message);
  })
}

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
