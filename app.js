const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://mongo:mongo99@ds053176.mlab.com:53176/db-todo', function(err) {
  if (err) {
    console.log('Cannot connect to DB, Error: ' + err);
  } else {
    console.log('Connected to DB successfully.');
  }
});

app.use(express.static('public'));
app.use('/', express.static('public/views'));

app.listen(8000, () => {
  console.log('Listening on 8000...');
});