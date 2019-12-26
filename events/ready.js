module.exports = (client) => {
  console.log(`Bot active in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  }