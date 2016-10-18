const
  express = require('express'),
  mongoose = require('mongoose'),
  todoTask = require('./models/task'),
  bodyParser = require("body-parser"),
  app = express(),
  router = express.Router();

app
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())
  .use(express.static('public'))
  .use('/', express.static('public/views'))
  .use('/', router);

//Establish DB connection
mongoose.connect('mongodb://mongo:mongo99@ds053176.mlab.com:53176/db-todo', function(err) {
  if (err) {
    console.log('Cannot connect to DB, Error: ' + err);
  } else {
    console.log('Connected to DB successfully.');
  }
});

//Register api routes
router.route('/tasks')
.post(function(req, res) {
  const task = new todoTask();
  console.log(req.body);
  task.name = req.body.name;

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

//Open port 8000 for app
app.listen(8000, () => {
  console.log('Listening on 8000...');
});