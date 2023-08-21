const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { time } = require('../../../functions');
const TrustedMembers = require("../../../schemas/TrustedMembers");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('trust-player')
        .setDescription('Add player to trusted players list.')
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


        const newTrustedMember = new TrustedMembers({
            member: user,
            addtime: new Date(),
        });
        await newTrustedMember.save()



        await interaction.reply({
            content: `**${user}** is now a trusted member.`
        });

    }
};