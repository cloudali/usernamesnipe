const { SlashCommandBuilder } = require('discord.js');
const snipe = require('../schemas/snipe');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('snipe a username')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('username')
                .setRequired(true)),
    async execute(interaction) {
        const username = interaction.options.getString('username');

        try {
            await interaction.deferReply();

            const data = await snipe.find({
                Member: interaction.member.id,
            });

            if (data.length === 5) {
                interaction.editReply({
                    embeds: [{
                        description: `❌ You are already sniping the max of **5** people`,
                        color: 0xff0000,
                    }],
                });
                return
            } else {
                await snipe.create({
                    Guild: interaction.guild.id,
                    Channel: interaction.channel.id,
                    Member: interaction.member.id,
                    Username: username,
                });

                return interaction.editReply({
                    embeds: [{
                        description: `✅ You are now sniping \`${username}\``,
                        color: 0x008000,
                    }],
                });
            }
        } catch (error) {
            console.error('Error in snipe command:', error);
            return interaction.followUp({
                content: 'An error occurred while processing your command.',
                ephemeral: true,
            });
        }
    },
};