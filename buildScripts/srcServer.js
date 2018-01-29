import express from 'express';
import bodyParser  from 'body-parser';
import session from 'express-session';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = process.argv[2] || 5000;
const app = express();

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo:true,
  publicPath: config.output.publicPath
}));

app.use(express.static('public'));
app.use(bodyParser());
app.use(bodyParser.urlencoded());
//app.use(cookieParser());
app.use(session({secret:'mysecretissecret'}));
require ('../src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

var nav = [
  {link: '/authors', text: 'Author'},
  {link: '/books', text: 'Book'}
];

var authorRouter = require('../src/routes/authorRoutes')(nav);
var bookRouter = require('../src/routes/bookRoutes')(nav);
var adminRouter = require('../src/routes/adminRoutes')(nav);
var authRouter = require('../src/routes/authRoutes')(nav);

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Authors', authorRouter);
app.use('/Auth', authRouter);

app.get('/', function(req,res) {
  res.render('index', {
    title: 'mytitle',
    nav: [
      {link: '/authors', text: 'Authors'},
      {link: '/books', text: 'Books'}
  ]});
});
app.listen(port, function(err) {
  if(err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
