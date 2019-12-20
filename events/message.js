module.exports = (client, message) => {
  var sleep = require('system-sleep');
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

  //CODE:  Companion Spawning
  function generateRandomNumber() {
    var min = 0.000,
      max = 100.000,
      highlightedNumber = Math.random() * (max - min) + min;
    highlightedNumber = parseFloat(highlightedNumber.toFixed(1));
    return (highlightedNumber);
  }
  
  let rintspawn = generateRandomNumber();

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