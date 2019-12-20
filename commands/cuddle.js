exports.run = (client, message, args) => {
    var sleep = require('system-sleep');
    var rar = require('../randomArrayEntry');
    var ei = require('../embedImage');
    const Discord = require('discord.js');
    //IMPORTANT: Userdata Initalization, otherwise crash;
    client.userdatainit;
    //Variable Init
    let authorID = message.author.id; //ID of the Command invoker
    let authorPing = '<@' + authorID + '>'; //Pings the Command invoker
    let companionUser = client.userdata.get(authorID, "activeCompanion");
    companionUser = companionUser.charAt(0).toUpperCase() + companionUser.slice(1);
    let companionMsgcuddle = client.companions.get(client.userdata.get(authorID, "activeCompanion"), "msgCuddle");
    let companionImgcuddle = client.companions.get(client.userdata.get(authorID, "activeCompanion"), "imgCuddle");
    let variant = client.userdata.get(authorID, "variant");
    
    //Required Functions
    function allPings() {
        mentionlist = [];
        for (count = 0; count <= args.length; count++) {
            if (String(args[count]).startsWith('<@')) {
                mentionlist.push(args[count] + ' ');
            }
        }
        if (mentionlist.length > 1) {
            mentionlist.splice(mentionlist.length - 1, 0, ' and ');
        }
        strMentionlist = String(mentionlist);
        strMentionlist = strMentionlist.replace(',', ' ');
        return strMentionlist = strMentionlist.replace(' ,', ' ');
    }

    //CODE
    let companionRarity = client.companions.get(client.userdata.get(authorID, "activeCompanion"), "rarity");
    companionRarity = companionRarity.charAt(0).toUpperCase() + companionRarity.slice(1);
    let footer = `${companionUser} - Rarity: ${companionRarity}`;
    switch (message.mentions.members.first()) {
        case undefined: //If no Member is mentioned
            if (client.userdata.get(authorID, "images") === true) { //If no member is mentioned but the author wants images
                const attachImage = new Discord.Attachment(rar.randomArrayEntry(companionImgcuddle), 'attachment.jpg'.toLowerCase());
                const attachThumb = new Discord.Attachment(`./companions/${companionUser}/${variant}.jpg`.toLowerCase(), 'thumbnail.jpg'.toLowerCase());
                const Embed = new Discord.RichEmbed()
                    .setColor(client.companions.get(companionUser, "color"))
                    .setTitle(`A cuddle by ${companionUser}!`)
                    .attachFiles([attachImage, attachThumb])
                    .setThumbnail('attachment://thumbnail.jpg')
                    .setImage('attachment://attachment.jpg')
                    .addField(rar.randomArrayEntry(companionMsgcuddle), `*cuddles* ${authorPing}`)
                    .setFooter(footer);
                return message.channel.send(Embed);
            } else { //If no member is mentioned and the author also doesn't want images
                const attachThumb = new Discord.Attachment(`./companions/${companionUser}/${variant}.jpg`.toLowerCase(), 'thumbnail.jpg'.toLowerCase());
                const Embed = new Discord.RichEmbed()
                    .setColor(client.companions.get(companionUser, "color"))
                    .setTitle(`A cuddle by ${companionUser}!`)
                    .attachFile(attachThumb)
                    .setFooter(footer)
                    .setThumbnail('attachment://thumbnail.jpg')
                    .addField(rar.randomArrayEntry(companionMsgcuddle), `*cuddles* ${authorPing}`);
                return message.channel.send(Embed);
            }
            default: //If a member is mentioned
                if (client.userdata.get(authorID, "images") === true) { //If a member is mentioned but the author wants images
                    const Embed = ei.embedImage('cuddle', client, message, args);
                    return message.channel.send(Embed);
                    /*
                    const attachImage = new Discord.Attachment(rar.randomArrayEntry(companionImgcuddle), 'attachment.jpg'.toLowerCase());
                    const attachThumb = new Discord.Attachment(`./companions/${companionUser}/${variant}.jpg`.toLowerCase(), 'thumbnail.jpg'.toLowerCase());
                    const Embed = new Discord.RichEmbed()
                        .setColor(client.companions.get(companionUser, "color"))
                        .setTitle(`A cuddle by ${companionUser}!`)
                        .attachFiles([attachImage, attachThumb])
                        .setThumbnail('attachment://thumbnail.jpg')
                        .setFooter(footer)
                        .setImage('attachment://attachment.jpg')
                        .addField(rar.randomArrayEntry(companionMsgcuddle), `*cuddles* ${allPings()}`);
                    return message.channel.send(Embed);*/

                } else { //If a member is mentioned and the author also doesn't want images
                const attachThumb = new Discord.Attachment(`./companions/${companionUser}/${variant}.jpg`.toLowerCase(), 'thumbnail.jpg'.toLowerCase());
                const Embed = new Discord.RichEmbed()
                    .setColor(client.companions.get(companionUser, "color"))
                    .setTitle(`A cuddle by ${companionUser}!`)
                    .attachFile(attachThumb)
                    .setFooter(footer)
                    .setThumbnail('attachment://thumbnail.jpg')
                    .addField(rar.randomArrayEntry(companionMsgcuddle), `*cuddles* ${allPings()}`);
                return message.channel.send(Embed);
                }
    }
}