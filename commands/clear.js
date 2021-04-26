module.exports = {
    name: 'clear',
    description: "Clear messages!",
   async execute(message, args, client) {

    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You don't have enough permissions to do that!");
    
    let deleteAmount;

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('Please enter the amount of messages to clear!') }

    if (parseInt(args[0]) > 100) {
        return message.reply('You can only delete 100 messages at a time!')
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount + 1, true);
    message.reply(`**Successfully** Deleted **${deleteAmount}** Messages.`)
}}