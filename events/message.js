const Levels = require('discord-xp');
const Blacklist = require('../database/models/blackListSchema');
const Afk = require('../database/models/afkSchema');
const mongoose = require('mongoose');
const Guild = require('../database/models/guildSchema');

module.exports = {
    name: 'message',
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;

        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!guildProfile) {
             guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id
            });
            await guildProfile.save().catch(err => console.log(err));
        }
        
        client.prefix = guildProfile.prefix;

        const randomXP = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
        if (hasLeveledUP) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`Good job ${message.member}, you are now level ${user.level}.`)

            if (user.level == 5) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 5");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 5",
                        color: "BLUE",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 5");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }
            if (user.level == 10) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 10");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 10",
                        color: "PURPLE",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 10");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }
            if (user.level == 25) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 25");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 25",
                        color: "YELLOW",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 25");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }
        }

        if (await Afk.findOne({
                userID: message.author.id
            })) {
            let afkProfile = await Afk.findOne({
                userID: message.author.id
            });
            if (afkProfile.messagesLeft == 0) {
                await Afk.findOneAndDelete({
                    userID: message.author.id
                });
                message.channel.send('You have been taken out of the AFK mode');
            } else {
                await Afk.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    messagesLeft: afkProfile.messagesLeft - 1
                });
            }
        }

        if (message.mentions.members.first()) {
            await message.mentions.members.forEach(async member => {
                let afkProfile = await Afk.findOne({
                    userID: member.user.id
                });
                if (afkProfile) message.channel.send(`${member.user.tag} is in AFK mode with reason: ${afkProfile.reason}`);
            });
        }

        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);
        if (command.devOnly == true & message.author.id !== '609318913938817024') return message.channel.send('Only the developer can execute this command.')

        let profile = await Blacklist.findOne({
            userID: message.author.id
        });
        if (profile) return message.channel.send('You are banned from using my commands');

        try {
            command.execute(message, args, client);
        } catch (err) {
            console.log(err);
        }
    },
};