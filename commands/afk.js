const Afk = require('../database/models/afkSchema');
const mongoose = require('mongoose');

module.exports = {
    name: 'afk',
    description: 'Sets the user in to AFK mode.',
    async execute(message, args, client) {
        let reason = args.join(" ");
        if (!reason) reason = "No reason Given";
        let afkProfile = await Afk.findOne({
            userID: message.author.id
        });
        if (!afkProfile) {
            afkProfile = await new Afk({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                reason: reason,

            });
            await afkProfile.save();
            message.channel.send('Your mode is set to: **AFK**');
        } else return message.channel.send('You are already AFK');
    },
};