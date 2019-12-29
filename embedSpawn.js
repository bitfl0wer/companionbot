exports.embedSpawn = function (rarity, companion, client, message, mrarity) {
    const Discord = require('discord.js');
    let companionName = companion.charAt(0).toUpperCase() + companion.slice(1);
    let color;
    switch (rarity) {
        case 'common':
            color = client.config.color_common;
            break;
        case 'uncommon':
            color = client.config.color_uncommon;
            break;
        case 'rare':
            color = client.config.color_rare;
            break;
        case 'epic':
            color = client.config.color_epic;
            break;
        case 'legendary':
            color = client.config.color_legendary;
            break;
        case 'mythical':
            color = client.config.color_mythical;
            break;
    }
    const attachThumb = new Discord.Attachment(`./companions/${companion}/vanilla.jpg`.toLowerCase(), 'thumbnail.jpg'.toLowerCase());
    const Embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(`:bell: Companion Spawn Alert!`)
        .attachFile(attachThumb)
        .setThumbnail('attachment://thumbnail.jpg')
        .addField(`${mrarity} ${companionName} has spawned!`, `Collect the companion with %collect ${companionName}!`);
    return Embed;
};