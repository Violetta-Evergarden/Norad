const { model, Schema } = require('mongoose');

module.exports = model('EnemyPlayers',
    new Schema({
        nickname: String,
        addtime: Date
    })
);

