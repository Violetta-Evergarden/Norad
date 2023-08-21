const { connect } = require("mongoose");
const config = require("../config");
const { log } = require("../functions");

module.exports = async () => {
    console.log("CONNECTING TO MONGODB")
    log('Started connecting to MongoDB...', 'warn');

    await connect("mongodb+srv://norad:sE1wTJ0i0RWFV7Ew@norad.j1wspee.mongodb.net/?retryWrites=true&w=majority").then(() => {
        console.log("MONGODB CONNECTION DONE")
    });
};