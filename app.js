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
mongoose.connect('mongodb://mongo:mongo99@ds053176.mlab.com:53176/db-todo', (err) => {
  if (err) {
    console.log('Cannot connect to DB, Error: ' + err);
  } else {
    console.log('Connected to DB successfully.');
  }
});

//Register api routes
router.route('/tasks')
.post((req, res) => {
  const todo = new todoTask();
  console.log(req.body);
  todo.name = req.body.name;

  //save task
  todo.save((err, todo) => {
    if (err) {
      console.log('Task creation unsuccessful! Error: ' + err);
      res.send(err);
    }

    res.json({
      savedItem: todo,
      message: 'Task created!'
    });
  });
})

.get((req, res) => {
  //get tasks
  todoTask.find((err, todos) => {
    if (err) {
      console.log('Cannot retrieve tasks! Error: ' + err);
      res.send(err);
    }

    res.json(todos);
  });
})

.put((req, res) => {
  console.log(req.query);

  todoTask.findById(req.query.id, (err, todo) => {
    if (err) {
      console.log('Cannot find task! Error: ' + err);
      res.send(err);
    }

    //Update task
    todo.isCompleted = !todo.isCompleted;

    //Save schema after Update
    todo.save((err) => {
      if (err)
        res.send(err);
    });

    const response = {
      success: true,
      id: todo._id
    };

    res.send(response);
  });
})

.delete((req, res) => {
  console.log(req.query);

  //Find task by Id and delete
  todoTask.findByIdAndRemove(req.query.id, (err, todo) => {
    if (err) {
      console.log('Cannot delete task! Error: ' + err);
      res.send(err);
    }

    const response = {
      success: true,
      id: todo._id
    };

    res.send(response);
  });
});

//Open port 8000 for app
app.listen(8000, () => {
  console.log('Listening on 8000...');
});