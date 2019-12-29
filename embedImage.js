exports.embedImage = function (action, client, message, args) {
    const Discord = require('discord.js');
    const fs = require('fs');
    var rar = require('./randomArrayEntry');
    let cAction = action.charAt(0).toUpperCase() + action.slice(1);
    let authorID = message.author.id; //ID of the Command invoker
    let authorPing = '<@' + authorID + '>'; //Pings the Command invoker
    let companionUser = client.userdata.get(authorID, "activeCompanion");
    companionUser = companionUser.charAt(0).toUpperCase() + companionUser.slice(1);
    let companionImgAction;
    if(client.companions.has(companionUser,`img${cAction}`)) {
        companionImgAction = client.companions.get(client.userdata.get(authorID, "activeCompanion"), `img${cAction}`);
        companionImgAction = rar.randomArrayEntry(companionImgAction);
    } else {
        companionImgAction = './placeholder.png';
    }
    let companionMsgAction;
    if(client.companions.has(companionUser, `msg${cAction}`)) {
        companionMsgAction = client.companions.get(client.userdata.get(authorID, "activeCompanion"), `msg${cAction}`);
    } else {
        return `:frowning: Sorry, but the companion ${companionUser} doesn't have messages for this action yet. You can fix this, by contributing messages here: https://github.com/gitflee/companionbot/tree/master/companions :heart: `;
    }
    let variant = client.userdata.get(authorID, "variant");
    let companionRarity = client.companions.get(client.userdata.get(authorID, "activeCompanion"), "rarity");
    companionRarity = companionRarity.charAt(0).toUpperCase() + companionRarity.slice(1);
    let footer = `${companionUser} - Rarity: ${companionRarity}`;

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
    action = String(action).toLowerCase();
    let eMessage;
    let eMessage2;
    switch (action) {
        case 'cuddle':
            eMessage = `A cuddle by ${companionUser}!`;
            eMessage2 = '*cuddles*';
            break;
        case 'hug':
            eMessage = `A hug by ${companionUser}!`;
            eMessage2 = `*hugs*`
            break;
        case 'blush':
            eMessage = `${companionUser} is blushing!`;
            eMessage2 = `*blushes at*`;
            break;
        case 'boop':
            eMessage = `A boop by ${companionUser}!`;
            eMessage2 = `*boops*`;
            break;
        case 'cheer':
            eMessage = `${companionUser} is cheering!`;
            eMessage2 = `*cheers for*`;
            break;
        case 'cry':
            eMessage = `${companionUser} is crying! :(`;
            eMessage2 = `*cries to*`;
            break;
        case 'cute':
            eMessage = `A compliment by ${companionUser}`;
            eMessage2 = `*compliments*`;
            break;
        case 'kiss':
            eMessage = `A kiss by ${companionUser}! :o`;
            eMessage2 = `*kisses*`;
            break;
        case 'pat':
            eMessage = `${companionUser} gives headpats!`;
            eMessage2 = `*pats*`;
            break;
        case 'poke':
            eMessage = `${companionUser} pokes around!`;
            eMessage2 = `*pokes*`;
            break;
        case 'pout':
            eMessage = `${companionUser} is pouting!`;
            eMessage2 = `*pouts*`;
            break;
    }
    const attachImage = new Discord.Attachment(companionImgAction, 'attachment.gif'.toLowerCase());
    const attachThumb = new Discord.Attachment(`./companions/${companionUser}/${variant}.jpg`.toLowerCase(), 'thumbnail.jpg'.toLowerCase());
    const Embed = new Discord.RichEmbed()
        .setColor(client.companions.get(companionUser, "color"))
        .setTitle(`${eMessage}`)
        .attachFiles([attachImage, attachThumb])
        .setThumbnail('attachment://thumbnail.jpg')
        .setFooter(footer)
        .setImage('attachment://attachment.gif')
        .addField(rar.randomArrayEntry(companionMsgAction), `${eMessage2} ${allPings()}`);
    return Embed;
};