const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

let Genre = new mongoose.Schema({
    genreName: {type: String, required: true},
    memeList: [{type: ObjectId, red: 'Meme'}]
});

module.exports = mongoose.model('Genre', Genre);