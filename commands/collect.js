exports.run = (client, message, args) => {
    //Fix: You can Collect infinite of the same companion
    let authorID = message.author.id;
    arg = String(args[0]).toLowerCase();
    scomp = String(client.serverdata.get(message.guild.id, 'scompanion')).toLowerCase();
    if (scomp === 'none') {
        return message.channel.send(":exclamation: This server either doesn't use the Collect-Spawnsystem, the spawnchannel has not been set up right, or there are no uncollected companions. ||Tell an Admin to set a spawnchannel with `%settings setchannel`, if they haven't already!||");
    } else if (scomp === 'collected') {
        return message.channel.send(':grey_exclamation: There is no companion to collect.');
    } else {
        if (arg === scomp) {
            if (String(client.userdata.get("companions")).indexOf(`${client.serverdata.get(message.guild.id, 'scompanion')}`) !== -1) {
                return message.channel.send(':grey_exclamation: You already own this companion. Let someone else collect it instead! :smile:');
            } else {
                message.channel.send(`:white_check_mark: You have successfully collected ${client.serverdata.get(message.guild.id, 'scompanion')}! Select your new companion with %select ${client.serverdata.get(message.guild.id, 'scompanion')}`);
                let companionarr = client.userdata.get(authorID, 'companions');
                companionarr.push(`${client.serverdata.get(message.guild.id, 'scompanion')}`);
                client.userdata.set(authorID, companionarr, "companions");
                return client.serverdata.set(message.guild.id, 'collected', 'scompanion');
            }
        }
    }
};