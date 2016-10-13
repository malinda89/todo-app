const express = require('express');
const mongoose = require('mongoose');
const todoTask = require('./models/task');

const app = express();
const router = express.Router();

app.use(express.static('public'));
app.use('/', express.static('public/views'));
app.use('/', router);

//Establish DB connection
mongoose.connect('mongodb://mongo:mongo99@ds053176.mlab.com:53176/db-todo', function(err) {
  if (err) {
    console.log('Cannot connect to DB, Error: ' + err);
  } else {
    console.log('Connected to DB successfully.');
  }
});

//Open port 8000 for app
app.listen(8000, () => {
  console.log('Listening on 8000...');
});

//Register api routes
router.route('/tasks')
  
  .post(function(req, res) {

    let task = new todoTask();
    console.log(req.query.name);
    task.name = 'hardcoded-task';

    //save task
    task.save(function(err, task) {
      if (err) {
        console.log('Task creation unsuccessful! Error: ' + err);
        res.send(err);
      }

      res.json({
        savedItem: task,
        message: 'Task created!'
      });
    });
  })

  .get(function(req, res) {
    //get tasks
    todoTask.find(function(err, tasks) {
      if (err) {
        console.log('Cannot retrieve tasks! Error: ' + err);
        res.send(err);
      }

      res.json(tasks);
    });
  });