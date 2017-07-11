const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const todoList = require('./todoSchema');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/todosapidb');

app.use(bodyParser.json())
app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

app.get('/api/todos', function(req, res) {
  todoList.find().then(function(results) {
    res.json(results);
  })
});

app.post('/api/todos', function(req, res) {
  const todo = new todoList({
    id: 3,
    title: "Hello",
    order: 3,
    completed: false
  });
  todo.save();
  res.json(todo);
});

app.get('/api/todos/:id', function(req, res) {
  let urlid = req.params.id;
  todoList.findById(urlid).then(function(result) {
    console.log(result);
    res.json(result);
  });
});

app.put('/api/todos/:id', function(req, res) {
  let urlid = req.params.id;

  todoList.findById(urlid).then(function(result){
    result.id = urlid,
    result.title = "PUT is a full document update",
    result.order = 3,
    result.completed = false
    result.save();              
    res.json(result);
  });
});

app.patch('/api/todos/:id', function(req, res) {
  let urlid = req.params.id;

  todoList.findById(urlid).then(function(result) {
    result.title = "PATCH is a partial document update"
    result.save();
    res.json(result);
  });
});

app.delete('/api/todos/:id', function(req, res) {
  let urlid = req.params.id;

  todoList.findByIdAndRemove(urlid).then(function(result) {
    result.save();
    res.json(result);
  });
});

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
