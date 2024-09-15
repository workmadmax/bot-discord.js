
const { SlashCommandBuilder } = require('discord.js')
const { data, execute } = require('./ping')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	
	async execute(interaction) {
		
		await interaction.reply(`This command was run by ${interaction.username},
			who joined on ${interaction.member.joinedAt}`)
	}
}