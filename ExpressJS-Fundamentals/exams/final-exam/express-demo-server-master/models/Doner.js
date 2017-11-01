const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const donerSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.String, required: true},
    image: { type: mongoose.Schema.Types.String, required: true },
    size: { type: mongoose.Schema.Types.Number, min: 17, max: 24 },
    toppings: [],
});

const Doner = mongoose.model('Doner', donerSchema);

module.exports = Doner;