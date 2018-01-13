var express = require('express');

var app = express();
var port = process.env.port || 5000;
app.use(express.static('public'));
app.set('views','./src/views');
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index', {title:'mytitle',list: ['topic a','topic b']});
});
app.get('/2', function(req, res) {
    res.render('index2', {title:'second index',list: ['topic 1','topic b']});
});

app.get('/books', function(req, res) {
    res.send('hi books');
});

app.listen(port, function(err) {
    console.log('listening on port ' + port);
});