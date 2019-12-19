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
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

client.userdata = new Enmap({name: "userdata"});

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
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    console.log(`Command successfully loaded: ${commandName}`);
  });
});

client.companions = new Enmap({name: 'companions'});

fs.readdir("./companions/", (err, files) => {
  if(err) return console.error(err);
  files.forEach(file => {
    if(!file.endsWith(".json")) return;
    let rawprops = fs.readFileSync(`./companions/${file}`);
    let props = JSON.parse(rawprops);
    let companionName = file.split(".")[0];
    console.log(`Attempting to load companion ${companionName}`);
    client.companions.set(companionName, props);
    console.log(`Companion successfully loaded: ${companionName}`);
  });
});

client.login(token.token);