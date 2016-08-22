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

// Define models
var Todo = mongoose.model('Todo', {
  text: String
});

// Run application
app.listen(8080);
console.log("App listening on port 8080");

// Routes

  // API -----------------------------------------------
  // Get all todos
  app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
      if (err) { res.send(err); }

      // Return all todos in JSON format
      res.json(todos);
    });
  });

  // Create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {
    Todo.create({
      text: req.body.text,
      done: false
    }, function(err, todo) {
      if (err) { res.send(err); }

      Todo.find(function(err, todos) {
        if (err) { res.send(err); }
        res.json(todos);
      });
    });
  });

  // Delete todo
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err) { res.send(err); }

      Todo.find(function(err, todos) {
        if (err) { res.send(err); }
        res.json(todos);
      });
    });
  });

  // Application -----------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
