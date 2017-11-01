/**
 * Created by Deyan Peychev on 15-Oct-17.
 */
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

let Meme = new mongoose.Schema({
    memeURL: {type: String, required: true},
    memeName: {type: String, required: true},
    genreSelect: {type: String, required: true},
    dateOfCreation: {type: Date, default: Date.now()},
    memeDescription: {type: String, default:"No description."},
});
module.exports = mongoose.model('Meme', Meme);