exports.embedImage = function (action) {
    module.exports = (client, message) => {
        let cAction = action.charAt(0).toUpperCase() + action.slice(1);
        let authorID = message.author.id; //ID of the Command invoker
        let companionUser = client.userdata.get(authorID, "activeCompanion");
        companionUser = companionUser.charAt(0).toUpperCase() + companionUser.slice(1);
        let companionMsgAction = client.companions.get(client.userdata.get(authorID, "activeCompanion"), `msg${cAction}`);
        let companionImgAction = client.companions.get(client.userdata.get(authorID, "activeCompanion"), `img${cAction}`);
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
        let eMessage;
        let eMessage2;
        switch (action) {
            case 'cuddle':
                eMessage = `A cuddle by `;
                eMessage2 = '*cuddles*';
        }

        const attachImage = new Discord.Attachment(rar.randomArrayEntry(companionImgAction), 'attachment.jpg'.toLowerCase());
        const attachThumb = new Discord.Attachment(`./companions/${companionUser}/${variant}.jpg`.toLowerCase(), 'thumbnail.jpg'.toLowerCase());
        const Embed = new Discord.RichEmbed()
            .setColor(client.companions.get(companionUser, "color"))
            .setTitle(`${eMessage} ${companionUser}!`)
            .attachFiles([attachImage, attachThumb])
            .setThumbnail('attachment://thumbnail.jpg')
            .setFooter(footer)
            .setImage('attachment://attachment.jpg')
            .addField(rar.randomArrayEntry(companionMsgAction), `${eMessage2} ${allPings()}`);
        return Embed;
    };
};