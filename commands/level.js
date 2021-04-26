const Levels = require('discord-xp');

module.exports = {
	name: 'level',
	description: 'Shows your level',
	async execute(message, args, client) {
		let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) mentionedMember = message.member;

        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id);
        if (!target) return message.channel.send("The mentioned member hasn't got a level within this server.")
    
        try {
            message.channel.send(`${mentionedMember} is level ${target.level} and has ${target.xp}/${Levels.xpFor(target.level +1)} XP`)


        } catch (err) {
            console.log(err);

        }
    },
};