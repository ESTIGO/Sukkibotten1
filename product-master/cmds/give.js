const Discord = require('discord.js');
const keyv = require('keyv');

module.exports = {
	name: 'give',
	aliases: ['give'],
	desc: 'assign a role for someone to own.',
	usage: 'give <@user/id> <@role/id>',
	cooldown: 1,
	guildOnly: true,
	devOnly: true,
	async run(client, message, args, prefixdb, colordb, roledb,prefix, color) {
	function getFromPing(mention) {
		if (!mention) return;
		if (mention.startsWith('<@') && mention.endsWith('>')) {
			mention = mention.slice(2, -1);
			if (mention.startsWith('!')) {
				mention = mention.slice(1);
			}
			return message.guild.members.get(mention);
		};
	};
		let ping = getFromPing(args[0]);
		if (!ping) ping = message.guild.member(message.guild.members.get(args[0]));
		if (!ping) return message.channel.send(`User: "${args[0]}" not found`);
		let role = message.mentions.roles.first() || message.guild.roles.find(x => x.id == args[1]);
		if (!args[1]) return message.channel.send('You need to provide a valid role');
		if (!role) return message.channel.send(`Role not found :(`);
		await roledb.set(ping.user.id, role.id);
		message.channel.send({
			embed: new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`Successfully bound the ${role} role (${role.id}) to ${ping.user.tag} (${ping.user.id})`)
		});
	},
}