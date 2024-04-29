const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Delete all messages from a specific user in the last 100 messages.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose messages you want to delete.')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        // Check if the user who issued the command is an administrator
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('You must be an administrator to use this command.');
        }

        try {
            await interaction.channel.messages.fetch({ limit: 100 }).then(messages => {
                const userMessages = messages.filter(m => m.author.id === user.id);
                interaction.channel.bulkDelete(userMessages);
                interaction.reply(`All messages from ${user.tag} have been deleted.`);
            });
        } catch (error) {
            console.error(error);
            interaction.reply('There was an error trying to delete messages from that user.');
        }
    },
};
