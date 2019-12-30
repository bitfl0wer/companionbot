exports.run = (client, message, args) => {
    //Fix: You can Collect infinite of the same companion
    let authorID = message.author.id;
    arg = String(args[0]).toLowerCase();
    switch (client.serverdata.get(message.guild.id, 'spawnmethod')) {
        case 1:
            scomp = String(client.serverdata.get(message.guild.id, 'scompanion')).toLowerCase();
            let ucomps = Array.from(client.userdata.get(authorID, 'companions'));
            let argButCapital = arg.charAt(0).toUpperCase() + arg.slice(1);
            let hasComp = ucomps.includes(argButCapital);
            if (scomp === 'none') {
                return message.channel.send(":exclamation:This server either doesn't use the Collect-Spawnsystem, the spawnchannel has not been set up right, or there are no uncollected companions. ||Tell an Admin to set a spawnchannel with `%settings setchannel`, if they haven't already!||");
            } else if (scomp === 'collected') {
                return message.channel.send(':grey_exclamation:There is no companion to collect.');
            } else {
                if (arg === scomp) {
                    if (hasComp === true) {
                        return message.channel.send(':grey_exclamation:You already own this companion. Let someone else collect it instead! :smile:');
                    } else {
                        message.channel.send(`:white_check_mark:You have successfully collected ${client.serverdata.get(message.guild.id, 'scompanion')}! Select your new companion with %select ${client.serverdata.get(message.guild.id, 'scompanion')}`);
                        let companionarr = client.userdata.get(authorID, 'companions');
                        companionarr.push(`${client.serverdata.get(message.guild.id, 'scompanion')}`);
                        client.userdata.set(authorID, companionarr, "companions");
                        return client.serverdata.set(message.guild.id, 'collected', 'scompanion');
                    }
                }
            }
            break;
        case 2:
            scomp2 = String(client.userdata.get(message.author.id, 'scompanion')).toLowerCase();
            let ucomps2 = Array.from(client.userdata.get(authorID, 'companions'));
            let argButCapital2 = arg.charAt(0).toUpperCase() + arg.slice(1);
            let hasComp2 = ucomps2.includes(argButCapital2);
            if (scomp2 === 'none') {
                return message.channel.send(":exclamation:You haven't rolled a companion yet! Roll one using %roll! :smile_cat:");
            } else if (scomp2 === 'collected') {
                return message.channel.send(':grey_exclamation:You have collected your last companion successfully, meaning that there is no companion to collect right now.');
            } else {
                if (arg === scomp2) {
                    if (hasComp2 === true) {
                        client.userdata.set(message.author.id, 'collected', 'scompanion');
                        return message.channel.send(':grey_exclamation:You already own this companion! :smile:');
                    } else {
                        message.channel.send(`:white_check_mark: You have successfully collected ${client.userdata.get(message.author.id, 'scompanion')}! Select your new companion with %select ${client.userdata.get(message.author.id, 'scompanion')}`);
                        let companionarr = client.userdata.get(authorID, 'companions');
                        companionarr.push(`${client.userdata.get(message.author.id, 'scompanion')}`);
                        client.userdata.set(authorID, companionarr, "companions");
                        return client.userdata.set(message.author.id, 'collected', 'scompanion');
                    }
                }
            }
            break;
    }
   
};