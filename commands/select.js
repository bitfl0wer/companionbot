exports.run = (client, message, args) => {
    let authorID = message.author.id; //ID of the Command invoker
    let argument = String(args[0]).toLowerCase()
    argument = argument.charAt(0).toUpperCase() + argument.slice(1);
    switch (args[0]) {
        case undefined:
            return message.channel.send(':grey_exclamation: Usage: `%select [companion]`');
        default:
            if(String(client.userdata.get(authorID, "companions")).indexOf(argument) > -1) {
                client.userdata.set(authorID, argument, "activeCompanion");
                return message.channel.send(`:white_check_mark: Your active companion was updated to ${argument}! :smiley_cat: `);
            } else {
                return message.channel.send(":negative_squared_cross_mark: You don't own that companion! :frowning:");
            }
    }
};