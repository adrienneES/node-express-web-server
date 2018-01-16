var express = require('express');

var app = express();
var port = process.env.port || 5000;
app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
var nav = [
  {link: '/authors', text: 'Author'},
  {link: '/books', text: 'Book'}
];
var authorRouter = require('./src/routes/authorRoutes')(nav);
var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/Books', bookRouter);
app.use('/Authors', authorRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'mytitle',
        nav: [
          {link: '/authors', text: 'Authors'},
          {link: '/books', text: 'Books'}
      ]
    });
});

app.listen(port, function(err) {
    console.log('listening on port ' + port);
});
