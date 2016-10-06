const express = require('express');

const app = express();

app.use(express.static('public'));
app.use('/', express.static('public/views'));

app.listen(8000, () => {
  console.log('Listening on 8000...');
});