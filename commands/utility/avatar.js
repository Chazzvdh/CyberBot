const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar URL of the selected user, or your own avatar.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose avatar you want to get')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        await interaction.reply(user.displayAvatarURL({ dynamic: true }));
    },
};
