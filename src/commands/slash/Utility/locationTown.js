const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { time } = require('../../../functions');
const TrustedMembers = require("../../../schemas/TrustedMembers");
const {Aurora} = require("earthmc");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('location-town')
        .setDescription('Gets location of the town.')
        .addStringOption((opt) =>
            opt.setName('town')
                .setDescription('town name')
                .setRequired(true)
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const town = interaction.options.getString('town')

        const TownInformation = await Aurora.Towns.get(town)

        const url = "https://earthmc.net/map/aurora/?worldname=earth&mapname=flat&zoom=5&x=" + TownInformation.x + "&y=64&z=" + TownInformation.z
        await interaction.reply({
            content: url
        });

    }
};