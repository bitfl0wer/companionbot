exports.run= (client, message, args) => {
    if(String(args[0]).toLowerCase() === 'setchannel') {
        client.serverdata.set(message.guild.id, message.channel.id);
    }
};