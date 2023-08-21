require('dotenv').config();
const ExtendedClient = require('./class/ExtendedClient');
const scanArea = require("./scanner/radar/radar");
const mongoose = require("mongoose");

const client = new ExtendedClient();

client.start();

client.once('ready', () => {

    const interval = 20000;
    const channel = client.channels.cache.get("1142366457875931147")

    scanArea(channel)

    const intervalId = setInterval(() => {
        scanArea(channel); // Call the scanArea function at intervals
    }, interval);
});


mongoose.connect("mongodb+srv://norad:sE1wTJ0i0RWFV7Ew@norad.j1wspee.mongodb.net/?retryWrites=true&w=majority").
then(() => {
    console.log("MONGO CONNECTED")

}).
catch(error => {
    console.log(error + " ERROR MONGOOSE CONNECTION")
});



process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
        console.log("")
    });
});


// Handles errors and avoids crashes, better to not remove them.
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
