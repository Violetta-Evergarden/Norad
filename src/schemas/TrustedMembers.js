const { model, Schema } = require('mongoose');

module.exports = model('TrustedMembers',
    new Schema({
        member: String,
        addtime: Date
    })
);

