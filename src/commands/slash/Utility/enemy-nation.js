const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { time } = require('../../../functions');
const EnemyScheme = require("../../../schemas/EnemyScheme");
const {Aurora} = require("earthmc");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('enemy-nation')
        .setDescription('Add nation residents to enemy players list.')
        .addStringOption((opt) =>
            opt.setName('nation')
                .setDescription('Nation name.')
                .setRequired(true)
        ),
    /**
     * @param {ExtendedClient} client
     * @param {ChatInputCommandInteraction} interaction
     */
    run: async (client, interaction) => {

        const nation = interaction.options.getString('nation')

        const fields = []

        const enemyResidents = await Aurora.Nations.get(nation).then(value =>
        {
            return value.residents
        })


        enemyResidents.forEach(resident => {
            const newEnemyPlayer = new EnemyScheme({
                nickname: resident,
                addtime: new Date(),
            });
            newEnemyPlayer.save()
        })


        await interaction.reply({

            content: "**" + nation + "** has been declared as an enemy state."
        });


    }



};