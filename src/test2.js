const {getAllPlayers} = require("./scanner/radar/utils");
const TrustedMembers = require('./schemas/TrustedMembers'); // Adjust the path as needed
const IntruderScheme = require('./schemas/IntruderScheme');
const mongoose = require("mongoose"); // Adjust the path as needed


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
mongoose.connect("mongodb+srv://norad:sE1wTJ0i0RWFV7Ew@norad.j1wspee.mongodb.net/?retryWrites=true&w=majority").
then(() => {
    console.log("MONGO CONNECTED")

}).
catch(error => {
    console.log(error + " ERROR MONGOOSE CONNECTION")
});


async function scanArea() {


    const fields = [];


    await getAllPlayers().then(data => {
        const scannedData = scanSquareArea(data, x1, z1, x2, z2);

        TrustedMembers.find({})
            .then((trustedMembers) => {
                const trustedPlayers = [];
                trustedMembers.forEach((trustedMember) => {
                    trustedPlayers.push(trustedMember.member);
                    console.log(trustedMember.member)
                });

                console.log('All "member" values:', trustedPlayers);
                for(i = 0; i<scannedData.length;i++) {

                    mongodbList = []
                    player = scannedData[i]

                    if(trustedPlayers.includes(player.name.toString()))
                    {

                        console.log("Trusted player:" + player.name)

                    }
                    else
                    {
                        fields.push({
                            name: player.name,
                            value: `X: ${player.x}, Z: ${player.z}`,
                            inline: true,
                        });
                        mongodbList.push({nickname: player.name, x: player.x, z:player.z})

                    }



                }

                const embed = {
                    color: 0x0099ff,
                    title: 'There are some players near our claims',
                    description: 'Be careful about creeps',
                    fields: fields, // Add the fields array to the embed
                    timestamp: new Date(),
                };

                console.log(fields)


            })
            .catch((err) => {
                console.error('Error fetching TrustedMembers:', err);
            });





    })
}


scanArea()