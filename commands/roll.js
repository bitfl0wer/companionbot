exports.run = (client, message, args) => {
    const randomFloat = require('random-float');
    var sleep = require('system-sleep');
    var rar = require('../randomArrayEntry');
    var gc = require('../getCompanion');
    var es = require('../embedSpawn');

    function generateRandomNumber() {
        for (let co = 0; co <= 100000; co++) {
            highlightedNumber = randomFloat(0, 100);
        }
        highlightedNumber = parseFloat(highlightedNumber.toFixed(1))
        return (highlightedNumber);
    }
    if (message.author.bot) return;
    let rintspawn = generateRandomNumber();
    switch (client.serverdata.get(message.guild.id, 'spawnmethod')) {
        case 2:
                if (message.author.bot) return;
                if (client.userdata.get(message.author.id, 'cooldown') !== true) {
                    let spawnedcompanion;
                    let spawnedrarity;
                    let srarity;
                    if (rintspawn > 0 && rintspawn < client.config.common) {
                        spawnedcompanion = gc.getCompanion('common', client);
                        spawnedrarity = 'A common';
                        srarity = "common";
                    }
                    if (rintspawn > client.config.common && rintspawn < client.config.common + client.config.rare) {
                        spawnedcompanion = gc.getCompanion('rare', client);
                        spawnedrarity = 'A rare';
                        srarity = "rare";
                    }
                    if (rintspawn > client.config.rare + client.config.common && rintspawn < client.config.common + client.config.rare + client.config.epic) {
                        spawnedcompanion = gc.getCompanion('epic', client);
                        spawnedrarity = 'An *epic*';
                        srarity = "epic";
                    }
                    if (rintspawn > client.config.rare + client.config.common + client.config.epic && rintspawn < client.config.common + client.config.rare + client.config.epic + client.config.legendary) {
                        spawnedcompanion = gc.getCompanion('legendary', client);
                        spawnedrarity = '**A legendary**';
                        srarity = "legendary";
                    }
                    if (rintspawn > client.config.rare + client.config.common + client.config.epic + client.config.legendary && rintspawn < client.config.common + client.config.rare + client.config.epic + client.config.legendary + client.config.mythical) {
                        spawnedcompanion = gc.getCompanion('mythical', client);
                        spawnedrarity = '***__A mythical__***';
                        srarity = "mythical";
                    }
                    client.userdata.set(message.author.id, spawnedcompanion, 'scompanion');
                    message.channel.send(es.embedSpawn(srarity, String(spawnedcompanion).toLowerCase(), client, message, spawnedrarity));
                    client.userdata.set(message.author.id, true, 'cooldown');
                    setTimeout(() => {
                        client.userdata.set(message.author.id, false, 'cooldown');
                    }, 600000); //600000
                } else {
                    return message.channel.send(`:exclamation: This command gets put cooldown for 10 minutes after using it.`);
                }
                //client.channels.get(`${client.serverdata.get(message.guild.id, 'spawnchannel')}`).send();

            break;
        case 1:
            message.channel.send(':grey_exclamation: This command is not enabled on this server, because the Server uses another spawnsystem. Companions will spawn in the designated channel.');
    }
};