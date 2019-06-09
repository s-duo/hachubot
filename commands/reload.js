exports.execute = (client, message, args)  => {
    const commandName = args[0];
    // Check if the command exists and is valid
    if(!client.commands.has(commandName)) {
        return message.reply('\`that command does not exist.\`');
    }
    // The path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from collection
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`\`the command ${commandName} has been reloaded!\``);        
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    cooldown: 5,
    botPerms: []
};

exports.help = {
    name: 'reload',
    description: '',
    usage: "[command]"
};