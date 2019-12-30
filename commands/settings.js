exports.run = (client, message, args) => {
    try {
        switch (String(args[0].toLowerCase())) {
            case 'setchannel':
                if (message.member.hasPermission('MANAGE_GUILD')) {
                    client.serverdata.set(message.guild.id, message.channel.id, 'spawnchannel');
                    message.channel.send(':white_check_mark: The Servers Spawnchannel was updated.');
                } else {
                    message.channel.send(':negative_squared_cross_mark: You do not have the permissions required by this command.');
                }

                break;
            case 'images':
                if (client.userdata.get(message.author.id, 'images') === false) {
                    client.userdata.set(message.author.id, true, 'images');
                    message.channel.send(':white_check_mark: Your command will now come with images.');
                } else {
                    client.userdata.set(message.author.id, false, 'images');
                    message.channel.send(':white_check_mark: Your command will now come without images.');
                }
                break;
            default:
                break;
            case 'spawnsystem':
                if (message.member.hasPermission('MANAGE_GUILD')) {
                    let sSystem = client.serverdata.get(message.guild.id, 'spawnmethod');
                    if(sSystem === 1) {
                        client.serverdata.set(message.guild.id, 2, 'spawnmethod');
                        message.channel.send(':white_check_mark: The Servers Spawnmethod was updated to the %roll command.');
                    } else {
                        client.serverdata.set(message.guild.id, 1, 'spawnmethod');
                        message.channel.send(':white_check_mark: The Servers Spawnmethod was updated to randomly spawning companions. Make sure, that a spawnchannel is set using the %settings setchannel command, or this system will not work.');
                    }
                } else {
                    message.channel.send(':negative_squared_cross_mark: You do not have the permissions required by this command.');
                }
                break;
        }
    } catch (TypeError) {
        return message.channel.send(":gear: **Settings**:\n:frame_photo: Images - *Enable or disable command images*\n:speech_left: Setchannel - *Mod only: Set the channel in which companions will spawn, if the server has set randomspawn as its default spawning method.*\n:tools: Spawnsystem - *Switch between the %roll and the Random-Companion-On-Message-Spawnsystem.*");
    }
};