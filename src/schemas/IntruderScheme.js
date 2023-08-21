const { model, Schema } = require('mongoose');

module.exports = model('Intruders',
    new Schema({
        nickname: String,
        x: Number,
        z: Number,
        date: Date
    })
);

