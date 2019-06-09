module.exports = (client, message) => {
    if (message.author.bot) return;

    // let prefix = false;
    // for(const thisPrefix of client.config.prefix) {
    //   if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    // }
    // if(!prefix) return;

    if (message.content.indexOf(client.config.prefix) !== 0) return;
    
    // if(message.author.id !== config.ownerID) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.conf.aliases && cmd.conf.aliases.includes(commandName));

    if (!command) return;

    if (command.conf.guildOnly && message.channel.type !== 'text') {
        return message.reply('\`i can\'t execute that command inside direct messages!\`');
    }

    if (command.conf.args && !args.length) {
        let reply = `\`you didn't provide any arguments, ${message.author}!\``;
        if (command.help.usage) {
            reply += `\n\`proper usage: ${client.config.prefix}${command.help.name} ${command.help.usage}\``;
        }
        return message.channel.send(reply);
    }

    // if (!cooldowns.has(command.name)) {
    //     cooldowns.set(command.name, new Discord.Collection());
    // }

    // const now = Date.now();
    // const timestamps = cooldowns.get(command.name);
    // const cooldownAmount = (command.cooldown || 3) * 1000;

    // if (timestamps.has(message.author.id)) {
    //     const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    //     if (now < expirationTime) {
    //         const timeLeft = (expirationTime - now) / 1000;
    //         return message.reply(`please wait ${timeLeft.toFixed(1)} more seconds(s) before reusing the \`${command.name}\` command.`);
    //     }
    // }

    // timestamps.set(message.author.id, now);
    // setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('\`there was an error trying to execute that command!\`');
    }

};