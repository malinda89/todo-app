const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new schema({
  name: String,
  isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('task', taskSchema);