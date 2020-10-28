const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: String,
    mail: String,
    password: String
});

module.exports = mongoose.model('user', userSchema);