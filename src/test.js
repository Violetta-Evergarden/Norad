const {Aurora} = require("earthmc");

async function test() {
    const TownInformation = await Aurora.Players.get("Zevahiri")


    console.log(TownInformation.x)
        }


test()