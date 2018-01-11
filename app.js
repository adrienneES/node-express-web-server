var express = require('express');

var app = express();
var port = process.env.port || 5000;
app.use(express.static('public'));
app.use(express.static('src/views'));
app.get('/', function(req, res) {
    res.send('hi');
});

app.get('/books', function(req, res) {
    res.send('hi books');
});

app.listen(port, function(err) {
    console.log('listening on port ' + port);
});