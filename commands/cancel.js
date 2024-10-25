const { SlashCommandBuilder } = require('discord.js');
const snipe = require('../schemas/snipe');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cancel')
        .setDescription('cancel your snipes'),
    async execute(interaction) {

        try {
            await interaction.deferReply();

            await snipe.deleteMany({ Member: interaction.member.id })

            return interaction.editReply({
                embeds: [{
                    description: `✅ You have cancelled all your snipes`,
                    color: 0x008000,
                }],
            });

        } catch (error) {
            console.error('Error in snipe command:', error);
            return interaction.followUp({
                content: 'An error occurred while processing your command.',
                ephemeral: true,
            });
        }
    },
};