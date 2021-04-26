module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    async execute(message, args){

        if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You don't have enough permissions to do that!");
        const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send("User has been kicked");
        }else{
            message.channel.send(`You coudn't kick that member!`);
        }
    }
}