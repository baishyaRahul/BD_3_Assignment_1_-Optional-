const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('BD 3 Assignment 1 (Optional)');
});

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

// Endpoint 1. Add a Task to the Task List
function addTask(tasks, taskId, text, priority) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTask(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

// Endpoint 2. Read All Tasks in the Task List
app.get('/tasks', (req, res) => {
  let result = tasks;
  res.json({ tasks: result });
});

// Endpoint 3. Sort Tasks by Priority
function taskPriorityByAscending(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let taskCopy = tasks.slice();
  let result = taskCopy.sort(taskPriorityByAscending);
  res.json({ tasks: result });
});

// Endpoint 4. Edit Task Priority
function editTaskPriority(taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editTaskPriority(taskId, priority);
  res.json({ tasks: result });
});

// Endpoint 5. Edit/Update Task Text
function editTaskText(taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = editTaskText(taskId, text);
  res.json({ tasks: result });
});

// Endpoint 6. Delete a Task from the Task List
function deleteTask(tasks, taskId) {
  return tasks.taskId !== taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((tasks) => deleteTask(tasks, taskId));
  res.json({ tasks: result });
});

// Endpoint 7. Filter Tasks by Priority
function filterTaskByPriority(tasks, priority) {
  return tasks.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((tasks) => filterTaskByPriority(tasks, priority));
  res.json({ tasks: result });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
