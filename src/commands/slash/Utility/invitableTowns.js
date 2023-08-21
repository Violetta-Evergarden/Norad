const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { time } = require('../../../functions');
const TrustedMembers = require("../../../schemas/TrustedMembers");
const {Aurora} = require("earthmc");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('invitable-towns')
        .setDescription('Self explainatory.'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const invitableTowns = await Aurora.Towns.invitable("New_Canada").then(value =>
        {
            return value
        })

        const fields = []

        invitableTowns.forEach(town=>{

            if(!town.mayor.toString().includes("NPC")) {
                fields.push({
                    name: town.name,
                    value: `O:` + town.mayor,
                    inline: true,
                });
            }


        })
        const embed = {
            color: 0x0099ff,
            title: 'There are some invitable near our claims',
            description: 'Dont forget to check if mayor is online',
            fields: fields,
            timestamp: new Date(),
        };


        await interaction.reply({
        embeds: [embed]
        });

    }
};