module.exports = {
    name: "slowmode",
    description: "Set the slowmode of a channel.",
    async execute(message, args, client) {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You don't have enough permissions to do that!");
        }
        let duration = args[0]
        if(isNaN(duration)) return message.reply("Please give the time in seconds.")
        let reason = args.slice(1).join("-")
        if(!reason) return message.reply("Please specify a reason!")
        
        message.channel.setRateLimitPerUser(duration, reason)
        message.reply(`Successfully set the **slowmode** to **${duration} seconds** with reason - **${reason}**`)
    }
}