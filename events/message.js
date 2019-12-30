module.exports = (client, message) => {
  const randomFloat = require('random-float');
  var sleep = require('system-sleep');
  var rar = require('../randomArrayEntry');
  var gc = require('../getCompanion');
  var es = require('../embedSpawn');
  /*Example for working with Companions:
    client.companions.get("lux", "msgHug");
    */
  function userdatainit() {
    client.userdata.ensure(`${message.author.id}`, { //Userdata Initalitation
      companions: ['Lux'],
      activeCompanion: 'Lux',
      variant: 'vanilla',
      level: 1,
      xp: 0,
      images: true
    });
  }
  client.userdatainit = userdatainit();
  client.serverdata.ensure(`${message.guild.id}`, { //Ensures Server has setting Object
    spawnchannel: 0,
    spawnmethod: 1,
    channelblacklist: [],
    premium: false,
    scompanion: 'none',
    cooldown: false
  })

  //CODE:  Companion Spawning
  //Note to self: DO NOT USE RETURN, OTHERWISE COMMANDS WILL NOT WORK (except in functions)
  function generateRandomNumber() {
    for (let co = 0; co <= 100000; co++) {
      highlightedNumber = randomFloat(0, 100);
    }
    highlightedNumber = parseFloat(highlightedNumber.toFixed(1))
    return (highlightedNumber);
  }
  if (message.author.bot) return;
  let rintspawn = generateRandomNumber();
  if (message.content.indexOf(client.config.prefix) === 0) {
    rintspawn = 200;
  }
  switch (client.serverdata.get(message.guild.id, 'spawnmethod')) {
    case 1:
      if (rintspawn <= client.config.chance_spawn) {
        if (message.author.bot) return;
        if (client.serverdata.get(message.guild.id, 'spawnchannel') !== 0) {
          if (client.serverdata.get(message.guild.id, 'cooldown') !== true) {
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
            client.serverdata.set(message.guild.id, spawnedcompanion, 'scompanion');
            client.channels.get(`${client.serverdata.get(message.guild.id, 'spawnchannel')}`).send(es.embedSpawn(srarity, String(spawnedcompanion).toLowerCase(), client, message, spawnedrarity));
            client.serverdata.set(message.guild.id, true, 'cooldown');
            setTimeout(() => {
              client.serverdata.set(message.guild.id, false, 'cooldown');
            }, 60000); //60000
          }
          //client.channels.get(`${client.serverdata.get(message.guild.id, 'spawnchannel')}`).send();
        }

      }
      break;
  }

  //CODE: Command Handling

  if (message.guild) {
    if (message.author.bot) return;
    let idAuthor = String(message.author.id)
    client.userdatainit;

    if (message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;

    function beTyping(time) { //Function to add "**Lux** is typing..." as a Discord indicator, time in ms
      message.channel.startTyping();
      sleep(time);
      return message.channel.stopTyping();
    }
    beTyping(200);
    cmd.run(client, message, args);
  }

};