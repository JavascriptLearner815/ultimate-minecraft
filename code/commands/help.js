const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	execute(message, args) {
		// ...
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			const title = 'Here\'s a list of all my commands:';
			data.push(commands.map(command => command.name).join(', '));
			const footer = `You can send \`${prefix}help [command name]\` to get info on a specific command!`;
			const helpEmbed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
				.setTitle(title)
				.setDescription(data)
				.setTimestamp(Date)
				.setFooter(footer);
			return message.channel.send(helpEmbed);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		const helpEmbed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setTitle(command.name)
			.setDescription(command.description || 'No description')
			.setTimestamp(Date)
			.setFooter(`You can send \`${prefix}help\` to get a list of all my commands!`);

		if (command.aliases) helpEmbed.addField('Aliases', command.aliases.join(', '), true);
		if (command.usage) helpEmbed.addField('Usage', `\`${prefix}${command.name} ${command.usage}\``, true);

		helpEmbed.addField('Cooldown', `${command.cooldown || 0} second(s)`, true);

		message.channel.send(helpEmbed);
	},
};
