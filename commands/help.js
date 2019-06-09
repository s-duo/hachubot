exports.execute = (client, message, args)  => {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
        // data.push('\`user commands:\`');
        data.push(commands.map(command =>`\`${client.config.prefix}${command.help.name} ${command.help.usage}: ${command.help.description}\``).join('\n'));
        // data.push(`\nyou can send \`${prefix}help [command name]\` to get info on a specific command!`);

        return message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('\`i\'ve sent you a direct message with all my commands!\`');
            })
            .catch(error => {
                console.error(`\`could not send help direct message to ${message.author.tag}.\`\n`, error);
                message.reply('\`could not send a direct message. do you have direct messages disabled?\`');
            });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
        return message.reply('\`that\'s not a valid command!\`');
    }

    data.push(`\`name: ${command.help.name}\``);

    if (command.conf.aliases) data.push(`\`aliases: ${command.conf.aliases.join(', ')}\``);
    if (command.help.description) data.push(`\`description: ${command.help.description}\``);
    if (command.help.usage) data.push(`\`usage: ${client.config.prefix}${command.help.name} ${command.help.usage}\``);

    data.push(`\`cooldown: ${command.conf.cooldown || 3} second(s)\``);

    message.channel.send(data, { split: true });
    // message.channel.sendCode("asciidoc", `= Command List =\n\n[Use ${prefix}help <commandname> for details]\n\n${commands.map(c=>`${prefix}${c.help.name} :: ${c.help.description}`).join("\n")}`);
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
    name: 'help',
    description: '',
    usage: "[command]"
};