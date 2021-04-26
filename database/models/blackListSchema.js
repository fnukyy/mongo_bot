const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    reason: String,
});

module.exports = new mongoose.model('Blacklist', blackListSchema, 'blacklists');