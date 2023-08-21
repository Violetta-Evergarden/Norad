const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { time } = require('../../../functions');
const TrustedMembers = require("../../../schemas/TrustedMembers");
const {Aurora} = require("earthmc");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('location-player')
        .setDescription('Gets location of the player.')
        .addStringOption((opt) =>
            opt.setName('player')
                .setDescription('Player IGN')
                .setRequired(true)
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const player = interaction.options.getString('player')

        const playerInformation = await Aurora.Players.get(player)

        const url = "https://earthmc.net/map/aurora/?worldname=earth&mapname=flat&zoom=5&x=" + playerInformation.x + "&y=64&z=" + playerInformation.z
        await interaction.reply({
            content: url
        });

    }
};