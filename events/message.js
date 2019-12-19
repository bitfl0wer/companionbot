module.exports = (client, message) => {
  /*Example for working with Companions:
    client.companions.get("lux", "msgHug");
    */
  if (message.guild) {
    if (message.author.bot) return;
    let idAuthor = String(message.author.id)
    client.userdata.ensure(idAuthor, { //Userdata Initalitation
      companions: ['lux'],
      activeCompanion: 'lux',
      level: 1,
      xp: 0,
      images: true
    });

    if (message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;
    cmd.run(client, message, args);
  }

};