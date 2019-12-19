exports.run = (client, message, args) => {
    //IMPORTANT: Userdata Initalization, otherwise crash;
    client.userdata.ensure(`${message.author.id}`, { //Userdata Initalization
        companions: ['lux'],
        activeCompanion: 'lux',
        level: 1,
        xp: 0,
        images: true
    });
    //Code:

}