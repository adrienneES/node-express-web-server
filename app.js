var express = require('express');

var app = express();
var port = process.env.port || 5000;
var sql = require('mssql');
var config = {
    user: 'nodeUser',
    password: 'adri4546',
    server: 'localhost',
    database: 'Books'
};

sql.connect(config, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected');
    }
});

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
var nav = [
  {link: '/authors', text: 'Author'},
  {link: '/books', text: 'Book'}
];
var authorRouter = require('./src/routes/authorRoutes')(nav);
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Authors', authorRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'mytitle',
        nav: [
          {link: '/authors', text: 'Authors'},
          {link: '/books', text: 'Books'}
      ]});
});

app.listen(port, function(err) {
    console.log('listening on port ' + port);
});
