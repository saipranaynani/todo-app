const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let todos = [];

// Create a new to-do
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required for a to-do' });
  }
  
  const todo = {
    id: todos.length + 1,
    text,
    completed: false,
  };
  
  todos.push(todo);
  res.status(201).json(todo);
});

// Get all to-dos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Mark a to-do as complete
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'To-do not found' });
  }
  
  todo.completed = true;
  res.json(todo);
});

// Delete a to-do
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'To-do not found' });
  }
  
  todos.splice(todoIndex, 1);
  res.sendStatus(204);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
