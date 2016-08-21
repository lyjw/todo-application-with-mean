var express         = require('express');
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride = require('method-override');

// Initialize application
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Initialize database connection
mongoose.connect('mongodb://localhost/scotch_todo');

// Run application
app.listen(8080);
console.log("App listening on port 8080");
