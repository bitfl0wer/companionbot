/***
 *       _____ ____        _   
 *      / ____|  _ \      | |  
 *     | |    | |_) | ___ | |_ 
 *     | |    |  _ < / _ \| __|
 *     | |____| |_) | (_) | |_ 
 *      \_____|____/ \___/ \__|
 *                             
 *                             
 */

const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
/*
let config = require('./config/config.json');
let token = require('./config/token.json');
*/
let rawconfig = fs.readFileSync('./config/config.json');
let rawtoken = fs.readFileSync('./config/token.json');
let config = JSON.parse(rawconfig);
let token = JSON.parse(rawtoken);
client.randomspawn = true;
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.userdata = new Enmap({
  name: "userdata",
  ensureProps: true
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log(`Command loaded: ${commandName}`);
  });
});

fs.readdir("./commands/interactions/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/interactions/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log(`Interaction loaded: ${commandName}`);
  });
});

client.companions = new Enmap({
  name: 'companions',
  ensureProps: true
});

fs.readdir("./companions/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".json")) return;
    let rawprops = fs.readFileSync(`./companions/${file}`);
    let props = JSON.parse(rawprops);
    let companionName = file.split(".")[0];
    companionName = companionName.charAt(0).toUpperCase() + companionName.slice(1);
    client.companions.set(companionName, props);
    console.log(`Companion loaded: ${companionName}`);
  });
});

client.serverdata = new Enmap({
  name: 'serverdata',
  ensureProps: true
});

client.activationcodes = new Enmap({
  name: 'codes'
});

let serverArr = Array.from(client.serverdata.keys());
for(let i = 0; i < client.serverdata.count; i++) {
  client.serverdata.set(serverArr[i], false, 'cooldown')
}
let userArr = Array.from(client.userdata.keys());
for(let i = 0; i < client.userdata.count; i++) {
  client.userdata.set(userArr[i], false, 'cooldown')
}
client.login(token.token);