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
    let companionMsgHug = client.companions.get(client.userdata.get(authorID, "activeCompanion"), "msgHug");
    let companionImgHug = client.companions.get(client.userdata.get(authorID, "activeCompanion"), "imgHug");
    if (message.mentions.members.first() != undefined) {
        mentionName = message.mentions.members.first().username;
        mentionID = message.mentions.members.first().id; //ID of the first user mentioned
        mentionTag = message.mentions.members.first().user.tag;
    } 
    //Required Functions
    function allPings() {
        mentionlist = [];
        for(count = 0; count <= args.length; count++){
            if(String(args[count]).startsWith('<@')) {
                mentionlist.push(args[count] + ' ');
             }
        }
        if(mentionlist.length > 1) {
            mentionlist.splice(mentionlist.length - 1, 0, ' and '); 
        }
        strMentionlist = String(mentionlist);
        strMentionlist = strMentionlist.replace(',',' ');
        return strMentionlist = strMentionlist.replace(' ,',' ');
    }

    //CODE

    switch (message.mentions.members.first()) {
        case undefined: //If no Member is mentioned
            if(client.userdata.get(authorID, "images") === true) { //If no member is mentioned but the author wants images
                return message.channel.send(rar.randomArrayEntry(companionMsgHug) + ` *hugs* ${authorPing}`, {file: rar.randomArrayEntry(companionImgHug)});
            } else { //If no member is mentioned and the author also doesn't want images
                return message.channel.send(rar.randomArrayEntry(companionMsgHug) + ` *hugs* ${authorPing}`);
            }
        default: //If a member is mentioned
            if(client.userdata.get(authorID, "images") === true) { //If a member is mentioned but the author wants images
                return message.channel.send(rar.randomArrayEntry(companionMsgHug) + ` *hugs* ${allPings()}`, {file: rar.randomArrayEntry(companionImgHug)});
            } else { //If a member is mentioned and the author also doesn't want images
                return message.channel.send(rar.randomArrayEntry(companionMsgHug) + ` *hugs* ${allPings()}`);
            }
    }
}