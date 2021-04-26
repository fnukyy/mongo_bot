const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["s"],
    description: "Says your input via the bot",
    usage: "<input>",
    async execute (message, args, client) {
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));


        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor('BLUE');

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}