const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.config = require('./config.json');

client.commands = new Discord.Collection();
client.support = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    });
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
});

client.login(client.config.token)