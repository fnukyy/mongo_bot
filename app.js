const Discord = require('discord.js');
const Levels = require ('discord-xp');
const client = new Discord.Client();
const mongoose = require('./database/mongoose');
const fs = require('fs');
require('dotenv').config();

Levels.setURL(`mongodb+srv://discordbot:${process.env.PASS}@yottstream.xzu7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Members');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('835491515173830677').send(`Hey <@${guildMember.user.id}>, welcome to **${guildMember.guild.name}**!`)
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}
mongoose.init();
client.login(process.env.TOKEN);