const {getAllPlayers} = require("./utils");
const {client} = require("../../index")
const channel = require("../../index");
const { Client, Intents, MessageEmbed, Embed} = require('discord.js');
const TrustedMembers = require('../../schemas/TrustedMembers'); // Adjust the path as needed
const IntruderScheme = require('../../schemas/IntruderScheme'); // Adjust the path as needed
const EnemyScheme = require('../../schemas/EnemyScheme'); // Adjust the path as needed

const { Aurora } = require('earthmc')


function scanSquareArea(data, x1, z1, x2, z2) {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minZ = Math.min(z1, z2);
    const maxZ = Math.max(z1, z2);

    const filteredData = data.filter(item => {
        return (
            item.type === 'player' &&
            item.x != 0 &&
            item.z != 0 &&
            item.x >= minX &&
            item.x <= maxX &&
            item.z >= minZ &&
            item.z <= maxZ
        );
    });

    return filteredData;
}

const x1 = -21800;
const z1 = -12700;
const x2 = -21000;
const z2 = -12000;


async function getTrustedPlayers() {




}


async function scanArea(channel) {


    const fields = [];


    await getAllPlayers().then(data => {
        const scannedData = scanSquareArea(data, x1, z1, x2, z2);
        let enemyAlert = false
        TrustedMembers.find({})
            .then((trustedMembers) => {
                const trustedPlayers = [];
                trustedMembers.forEach((trustedMember) => {
                    trustedPlayers.push(trustedMember.member);
                });


                if(scannedData.length === 0) {return}


                EnemyScheme.find({})
                    .then((enemyPlayers) => {

                        const enemiesList = []
                        enemyPlayers.forEach((enemy) => {
                            enemiesList.push(enemy.nickname);
                        });

                for(i = 0; i<scannedData.length;i++) {

                    mongodbList = []
                    player = scannedData[i]

                    if(!trustedPlayers.includes(player.name.toString()))
                    {

                        if(enemiesList.includes(player.name.toString())) {
                            enemyAlert = true
                            fields.push({
                                name: player.name + ":bangbang:",
                                value: `X: ${player.x}, Z: ${player.z}`,
                                inline: true,
                            });
                        } else {
                            fields.push({
                                name: player.name,
                                value: `X: ${player.x}, Z: ${player.z}`,
                                inline: true,
                            });
                        }


                        mongodbList.push({nickname: player.name, x: player.x, z:player.z})

                    }



                }

                if(fields.length === 0) {return}

                const embed = {
                    color: 0x0099ff,
                    title: 'There are some players near our claims',
                    description: 'Be careful about creeps',
                    fields: fields,
                    timestamp: new Date(),
                };
                if(enemyAlert) {
                    channel.send({embeds: [embed], content: "<@&1142403304580722718> An enemy has been detected in our claims." });
                } else {

                    const date = new Date();
                    channel.send({embeds: [embed] , content: date.toDateString() + " " + date.getHours() })

                }

                saveToMongoDB(mongodbList)


            })
            .catch((err) => {
                console.error('Error fetching TrustedMembers:', err);
            });




            })
    })
}

async function saveToMongoDB (mongodbList) {
    for(i = 0; i<mongodbList.length;i++) {
        const newIntruderRecord = new IntruderScheme({
            nickname: mongodbList[i].nickname,
            date: new Date(),
            x:mongodbList[i].x,
            z:mongodbList[i].z,
        });
        await newIntruderRecord.save()
    }
}


module.exports = scanArea;