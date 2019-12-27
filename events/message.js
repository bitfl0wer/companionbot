module.exports = (client, message) => {
  var sleep = require('system-sleep');
  var rar = require('../randomArrayEntry');
  var gc = require('../getCompanion');
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
    scompanion: 'none'
  })

  //CODE:  Companion Spawning
  //Note to self: DO NOT USE RETURN, OTHERWISE COMMANDS WILL NOT WORK (except in functions)
  function generateRandomNumber() {
    var min = 0.000,
      max = 100.000,
      highlightedNumber = Math.random() * (max - min) + min;
    highlightedNumber = parseFloat(highlightedNumber.toFixed(1));
    return (highlightedNumber);
  }

  let rintspawn = generateRandomNumber();
  let cooldown;
  if (message.content.indexOf(client.config.prefix) === 0) {
    rintspawn = 200;
  }

  switch (client.serverdata.get(message.guild.id, 'spawnmethod')) {
    case 1:
      if (rintspawn <= client.config.chance_spawn) {
        if (message.author.bot) return;
        if (client.serverdata.get(message.guild.id, 'spawnchannel') !== 0) {
          if (client.cooldown.get('cooldown') !== true) {
            let spawnedcompanion;
            if (rintspawn <= client.config.common) {
              spawnedcompanion = gc.getCompanion('common', client);
            }
            if (rintspawn <= client.config.uncommon) {
              spawnedcompanion = gc.getCompanion('uncommon', client);
            }
            if (rintspawn <= client.config.rare) {
              spawnedcompanion = gc.getCompanion('rare', client);
            }
            if (rintspawn <= client.config.epic) {
              spawnedcompanion = gc.getCompanion('epic', client);
            }
            if (rintspawn <= client.config.legendary) {
              spawnedcompanion = gc.getCompanion('legendary', client);
            }
            if (rintspawn <= client.config.mythical) {
              spawnedcompanion = gc.getCompanion('mythical', client);
            }
            client.serverdata.set(message.guild.id, spawnedcompanion, 'scompanion');
            client.channels.get(`${client.serverdata.get(message.guild.id, 'spawnchannel')}`).send(`:bell: ${spawnedcompanion} has been spawned! Collect the companion with %collect ${spawnedcompanion}`);
            client.cooldown.set('cooldown', true);
            setTimeout(() => {
              client.cooldown.set('cooldown', false);
            }, 120000); //120000
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