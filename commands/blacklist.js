const Blacklist = require('../database/models/blackListSchema');
const mongoose = require('mongoose');

module.exports = {
    name: 'blacklist',
    description: 'Bans a member from using the bot.',
    devOnly: true,
    async execute(message, args, client) {

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");

        if (!args[0]) return message.channel.send('You need to provide a member to blacklist along with the reason.');
        if (!mentionedMember) return message.channel.send('The member stated is not in this server.');
        if (!reason) reason = 'No reason given.';

        let profile = await Blacklist.findOne({
            userID: mentionedMember.user.id
        });

        if (profile) return message.channel.send('This member is already blacklisted.');
        profile = await new Blacklist({
            _id: mongoose.Types.ObjectId(),
            userID: mentionedMember.user.id,
            reason: reason,
        });
        try {
            await profile.save();
            message.channel.send('Banned ' + mentionedMember.user.tag + ' from using the bot commands.');
        } catch (err) {
            console.log(err);
        }
    },
};