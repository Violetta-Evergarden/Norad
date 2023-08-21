const { ModalSubmitInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const TrustedMembers = require('../../schemas/TrustedMembers');
module.exports = {
    customId: 'modal-example',
    /**
     *
     * @param {ExtendedClient} client
     * @param {ModalSubmitInteraction} interaction
     */
    run: async (client, interaction) => {

        const nameInput = interaction.fields.getTextInputValue('name');
        const whoadded = interaction.user.username;


        const newTrustedMember = new TrustedMembers({
            member: nameInput,
            whoadded: whoadded,
            addtime: new Date(),
        }); 

        await newTrustedMember.save((err, trustedMember) => {
            if (err) {
                interaction.reply({
                    content: `An error occured please inform zevahiri`
                });
                console.error(err);
            } else {
                interaction.reply({
                    content: `**${nameInput}** is now a trusted member.`
                });
            }
        });



    }
};