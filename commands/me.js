exports.execute = (client, message, args)  => {
    message.channel.send(`\`username: ${message.author.username}\`\n\`id: ${message.author.id}\``);
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
    name: 'me',
    description: '',
    usage: ""
};