module.exports = (client) => {
  client.user.setActivity(`${client.config.version}`, {type: "PLAYING"});
  console.log(`Bot active in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  }