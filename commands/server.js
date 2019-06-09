exports.execute = (client, message, args)  => {
    message.channel.send(`\`server: ${message.guild.name}\`\n\`members: ${message.guild.memberCount}\``);
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
    name: 'server',
    description: '',
    usage: ""
};