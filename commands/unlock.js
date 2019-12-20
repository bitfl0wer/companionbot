exports.run = (client, message, args) => {
    let authorID = message.author.id; //ID of the Command invoker
    client.userdata.evict(authorID);
    let companionarr = client.userdata.get(authorID, 'companions');
    console.log(companionarr);
    if (String(companionarr).indexOf("Senko") === -1) {
        companionarr.push("Senko");
        client.userdata.set(authorID, companionarr, "companions");
        return message.channel.send(":white_check_mark: Senko was added to your Companions List for testing!");
    } else {
        return message.channel.send(':grey_exclamation: Senko is already your companion!');
    }
};