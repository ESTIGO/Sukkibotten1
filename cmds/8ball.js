const Discord = require("discord.js")
module.exports = {
	name: "8ball",
	aliases: ['8ball', 'b'],
	guildOnly: false,
	cooldown: 2,
	desc: 'Ask the bot a question and get its reponse/idea about it. I\'m sure you know what 8ball really is.\nWhy not try it out?',
	usage: "8ball <question>",
	async run(client, message, args, prefixdb, colordb, roledb,prefix, color) {
	let question = args.join(" ")
	const answers = [
			'As I See It Yes',
			'Ask Again Later',
			'Better Not Tell You Now',
			'Cannot Predict Now',
			'Concentrate and Ask Again',
			'Don\'t Count On It',
			'It Is Certain',
			'It Is Decidely So',
			'Most Likely',
			'My Reply Is No',
			'My Sources Say No',
			'Outlook Good',
			'Outlook Not So Good',
			'Signs Point to Yes',
			'Very Doubtful',
			'Without A Doubt',
			'Yes',
			"Impossible",
			"bruh",
			'Yes - Definitely'
	];
	if (!question) {
		return message.reply(`Invalid Usage. You need to give a question!`)
	}
	const embed = new Discord.RichEmbed()
	.setColor(color)
	.setAuthor(`8ball`, 'http://8ballsportsbar.com/wp-content/uploads/2016/02/2000px-8_ball_icon.svg_.png')
	.addField('Info:', `**Your Question:** ${question}\n**My Prediction:** ${answers[~~(Math.random() * answers.length)]}`);
	message.channel.send({embed}).catch(console.error);
	},
};