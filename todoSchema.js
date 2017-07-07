const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  order: Number,
  completed: Boolean
});

const todoList = mongoose.model('todoList', todoSchema);

module.exports = todoList;
