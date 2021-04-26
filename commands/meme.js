const { MessageEmbed } = require('discord.js');
const api = require ('imageapi.js');

module.exports = {
    name: 'meme',
    description: 'sends a meme',
    cooldown:2500,
    async execute(message, args) {
        const subreddits = ['meme', 'dankmemes', 'memes'];
        const subreddit = subreddits[Math.floor(Math.random() * (subreddits.length))];
        const meme = await api.advanced(subreddit);
        return message.channel.send(new MessageEmbed()
        .setTitle(`r/${subreddit}`)
        .setColor(`BLUE`)
        .setURL(`https://reddit.com/r/${subreddit}`)
        .setDescription(`Posted by u/**${meme.author}**`)
        .setImage(meme.img)
        .setTimestamp()
        .setFooter('AdamBot', 'https://cdn.discordapp.com/attachments/829052917575057479/831860826616758302/image0.png')
        )
}
}