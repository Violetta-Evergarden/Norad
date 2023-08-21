const fetchAPI = async () =>{
    const response = await fetch("https://earthmc.net/map/aurora/standalone/MySQL_update.php?world=earth");
    const data = await response.json();
    return data;
}

const getAllPlayers = async () =>{

    const response = await fetch("https://earthmc.net/map/aurora/standalone/MySQL_update.php?world=earth");
    const data = await response.json();
    const players = await data.players;
    return await players
}


module.exports = {
    getAllPlayers,
    fetchAPI
};