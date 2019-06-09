exports.execute = (client, message, args)  => {
    message.channel.send('\`pong\`');
},

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    cooldown: 5,
    botPerms: []
};

exports.help = {
    name: 'ping',
    description: 'ping!',
    usage: ""
};