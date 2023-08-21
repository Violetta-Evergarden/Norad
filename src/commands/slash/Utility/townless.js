const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { time } = require('../../../functions');
const TrustedMembers = require("../../../schemas/TrustedMembers");
const { Aurora } = require('earthmc')
module.exports = {
    structure: new SlashCommandBuilder()
        .setName('townless')
        .setDescription('Add player to trusted players list.'),
    /**
     * @param {ExtendedClient} client
     * @param {ChatInputCommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const townlessPlayers = await Aurora.Players.townless().then(value => {
            return value
        })

        let str = ""

        townlessPlayers.forEach(value=>{
            str = str + " " + value.name
        })

        await interaction.reply({
            content: "`" + "/t invite" + str
        });

    }
};