exports.run = (client, message, args) => {
    var sleep = require('system-sleep');
    var rar = require('../../randomArrayEntry');
    const Discord = require('discord.js');
    var ei = require('../../embedImage');
    var eis = require('../../embedImageSelf');
    var eins = require('../../embedNoImageSelf');
    var ein = require('../../embedNoImage');
    var eie = require('../../embedImageEveryone');
    var eine = require('../../embedNoImageEveryone');
    //IMPORTANT: Userdata Initalization, otherwise crash;
    client.userdatainit;
    //Variable Init
    let authorID = message.author.id; //ID of the Command invoker
    let companionUser = client.userdata.get(authorID, "activeCompanion");
    companionUser = companionUser.charAt(0).toUpperCase() + companionUser.slice(1);
    //Required Functions
    //CODE
    client.userdata.evict(authorID);
    switch (message.mentions.members.first()) { 
        case undefined: //If no member is Mentioned:
            if(args[0] != undefined) {
                if(String(args[0]).toLowerCase() === 'everyone') {
                    if (client.userdata.get(authorID, "images") === true) { 
                        return message.channel.send(eie.embedImageEveryone('hug', client, message, args));
                    } else {
                        return message.channel.send(eine.embedNoImageEveryone('hug', client, message, args));
                    }
                }
            }
            if (client.userdata.get(authorID, "images") === true) { //No mention, WITH images
                return message.channel.send(eis.embedImageSelf('hug', client, message, args));
            } else { //No mention, WITHOUT images
                return message.channel.send(eins.embedNoImageSelf('hug', client, message, args));
            }
            default: //If a member is mentioned
                if (client.userdata.get(authorID, "images") === true) { //Mention, WITH images
                    return message.channel.send(ei.embedImage('hug', client, message, args));
                } else { //Mention, WITHOUT images
                return message.channel.send(ein.embedNoImage('hug', client, message, args));
                }
    }
}