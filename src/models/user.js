const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  emailAddress: { type: String, required: true, unique: true },
  identityNumber: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);
