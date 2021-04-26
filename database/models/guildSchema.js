const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    lastEdited: String,
    prefix: { type: String, default: "!" },
    muteRoleID: { type: String, required: false },
    memberRoleID: { type: String, required: false }
});

module.exports = new mongoose.model('Guild', guildSchema, 'guilds');