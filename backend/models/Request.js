const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: String,
  category: String,
  comment: String,
});

module.exports = mongoose.model('Request', requestSchema);
