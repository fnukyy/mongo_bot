const Levels = require('discord-xp');

module.exports = {
    name: 'leaderboard',
    description: 'Displays the servers top 5 leveled users.',
    async execute(message, args, client) {

        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); // We grab top 5 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

        message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
    },
};