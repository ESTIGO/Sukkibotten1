const Discord = require("discord.js")

module.exports = {
	name: "grole",
	aliases: ['grole'],
	cooldown: 2,
	guildOnly: true,
	devOnly: false,
	desc: 'Give or remove a role from a user, if they already have a role then I will remove it, if they do not have it then they will have the role added to them',
	usage: 'role <role id, mention or name> <user id, or mention>',
async run(client, message, args, prefixdb, colordb, roledb,prefix, color) {
	const msg = await message.channel.send("Processing...")

	if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
		msg.edit(`I do not have the **MANAGE ROLES** permission. Please make sure I have this permission!`)
	}

	if (!message.member.permissions.has("MANAGE_ROLES")) {
		return msg.edit(`You do not have permission to use this command!\n> You need the **MANAGE ROLES** permission in order to use this command!`)
	}

	let userArg = args[0];
	let roleArg = args.slice(1).join(" ").toLowerCase();

	if (!userArg) return msg.edit("Please provide a user arguement")
	if (!roleArg) return msg.edit("Please provide a role arguement")

	let guildMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(userArg))
	let guildRole = message.guild.roles.find(r => r.name.toLowerCase() == args.slice(1).join(' ').toLowerCase()) || message.guild.roles.find(x => x.name.toLowerCase().startsWith(roleArg)) || message.mentions.roles.first();


	if (!guildMember) return msg.edit(`I cannot find that user!`)
	if (!guildRole) return msg.edit("I cannot find that role!")

	try {
		if (guildMember.roles.has(guildRole.id)) {
			guildMember.removeRole(guildRole.id)
			msg.edit('', {
				embed: new Discord.RichEmbed()
				.setColor(color)
				.setDescription(`${guildMember.user.tag} has lost the ${guildRole.name} role`)
			})
		} else {
			guildMember.addRole(guildRole.id)
			msg.edit(``, {
				embed: new Discord.RichEmbed()
				.setColor(color)
				.setDescription(`${guildMember.user.tag} has received the ${guildRole.name} role`)
			})
		}
	} catch (e) {
		msg.edit(`${message.author} ${process.env.re} I was unable to add/remove that role. Please ensure that I have permission to do so.`)
	};
}
};