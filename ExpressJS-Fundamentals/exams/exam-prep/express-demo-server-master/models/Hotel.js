/**
 * Created by Deyan Peychev on 20-Oct-17.
 */
const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const hotel = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true},
    location: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String, required: true},
    type: { type: mongoose.Schema.Types.String, ref:'Category', required: true },
    description: { type: mongoose.Schema.Types.String, default: "No description." },
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now() },
    reviews: [],
    views: { type: mongoose.Schema.Types.Number, default: 0 },
    likes: { type: mongoose.Schema.Types.Number, default: 0 },
});

const Hotel = mongoose.model('Hotel', hotel);

module.exports = Hotel;
