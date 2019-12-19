exports.run = (client, message,args) => {
    console.log(client.companions.get("lux"));
    return message.channel.send('Debug: Logged in Console;');
}