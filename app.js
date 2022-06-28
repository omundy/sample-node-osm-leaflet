

const express = require('express');
const app = express();
const path = require("path");
const port = 3000;


// make handlebars the view engine
const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
	extname: 'hbs',
	defaultLayout: 'index',
	layoutsDir: __dirname + '/views/'
}));

// app.engine('hbs', hbs({
// 	layoutsDir: path.join(__dirname, 'views/layouts'),
// 	defaultLayout: 'index',
// 	extname: '.hbs'
// }));

// static public directory
app.use(express.static(path.resolve('./public')));
// routes file
var routes = require('./routes');
app.use('/', routes);

// start server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
