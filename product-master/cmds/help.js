const Discord = require('discord.js')
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	guildOnly: false,
	devOnly: false,
	cooldown: 3,
	async run(client, message, args, prefixdb, colordb, roledb,prefix, color) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			return message.channel.send({
				embed: new Discord.RichEmbed()
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor(color)
				.setDescription('Here\'s a list of **all** my commands: ' + client.commands.map(cmd => cmd.name.toString()).join(', ') + '\n\nYou can use `' + prefix + 'help <command name>` for more info on a specific command')
			})
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.channel.send(
				`I can't find that command! Look in \`${prefix}help\` for a list of commands!`
			)
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};