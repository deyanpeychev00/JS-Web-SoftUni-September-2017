/**
 * Created by Deyan Peychev on 20-Oct-17.
 */
/**
 * Created by Deyan Peychev on 20-Oct-17.
 */
const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const category = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
});

const Category = mongoose.model('Category', category);

module.exports = Category;
