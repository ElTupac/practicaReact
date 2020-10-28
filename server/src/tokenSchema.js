const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    user: String,
    user_id: String,
    token: String,
    created: Number
});

module.exports = mongoose.model('token', tokenSchema);