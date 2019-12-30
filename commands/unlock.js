exports.run = (client, message, args) => {
    //%unlock add key companion
    let ownerid = client.config.owner;
    let authorID = message.author.id; //ID of the Command invoker
    client.userdata.evict(authorID);
    let companionarr = client.userdata.get(authorID, 'companions');
    switch (args[0]) {
        case 'add':
            if (String(authorID) == String(ownerid)) {
                if (args[1] === undefined) {
                    console.log(args[0] + ' ' + args[1] + ' ' + args[2]);
                    return;
                } else {
                    const structure = {
                        companion: `${args[2]}`,
                        redeemable: true
                    }
                    client.activationcodes.set(`${args[1]}`, structure);
                    return message.channel.send(':white_check_mark: Success! An activation code was successfully created in activationcodes.sqlite');
                }
            }
            case 'redeem':
                if (args[1] === undefined) {
                    return message.channel.send(':negative_squared_cross_mark: Error! Please provide your activation key.');
                }
                if (client.activationcodes.has(`${args[1]}`)) {
                    if (client.activationcodes.get(`${args[1]}`, 'redeemable') === true) {
                        client.activationcodes.set(`${args[1]}`, false, 'redeemable');
                        companionarr.push(String(client.activationcodes.get(`${args[1]}`, 'companion')));
                        client.userdata.set(authorID, companionarr, "companions");
                        return message.channel.send(':white_check_mark: Success! Your activation key has been redeemed! ' + String(client.activationcodes.get(`${args[1]}`, 'companion')) + ' has been added to your account.');
                    } else {
                        return message.channel.send(':grey_exclamation: This activation key has already been redeemed and cannot be redeemed again.');
                    }
                } else {
                    return message.channel.send(':grey_exclamation: This activation key does not seem to exist.');
                }
    }

};