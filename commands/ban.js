module.exports = {
    name: 'ban',
    description: "This command bans a member!",
    async execute(message, args, client){

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("You don't have enough permissions to do that!");
        const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.ban();
            message.channel.send("User has been banned");
        }else{
            message.channel.send(`You coudn't ban that member!`);
        }
    }
}