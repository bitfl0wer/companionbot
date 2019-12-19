exports.run = (client, message, args) => {
    var sleep = require('system-sleep');
    var rar = require('../randomArrayEntry');
    //IMPORTANT: Userdata Initalization, otherwise crash;
    client.userdatainit;
    //Variable Init
    let authorID = message.author.id; //ID of the Command invoker
    let authorPing = '<@' + authorID + '>'; //Pings the Command invoker
    let authorName = message.author.username;
    let mentionPing = message.mentions.members.first(); //Ping of the first user mentioned
    let mentionID;
    let mentionTag;
    let mentionName;
    let companionUser = client.userdata.get(authorID, "activeCompanion");
    let companionMsgHug = client.companions.get(`${companionUser}`, "msgHug");
    if (message.mentions.members.first() != undefined) {
        mentionName = message.mentions.members.first().username;
        mentionID = message.mentions.members.first().id; //ID of the first user mentioned
        mentionTag = message.mentions.members.first().user.tag;
    } else {
        return message.channel.send(rar.randomArrayEntry(companionMsgHug));
    }
}