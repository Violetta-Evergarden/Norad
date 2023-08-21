const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { time } = require('../../../functions');
const EnemyScheme = require("../../../schemas/EnemyScheme");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('enemy-player')
        .setDescription('Add player to enemy players list.')
        .addStringOption((opt) =>
            opt.setName('player')
                .setDescription('The players IGN.')
                .setRequired(true)
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {


        const user = interaction.options.getString('player')

        const newEnemyPlayer = new EnemyScheme({
            nickname: user,
            addtime: new Date(),
        });
        await newEnemyPlayer.save()



        await interaction.reply({
            content: `**${user}** is now an enemy.`
        });

    }
};