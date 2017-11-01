const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let Tag = new mongoose.Schema({
    tagName: {type: String, required: true},
    images: [{type: ObjectId, ref: 'Image'}],
});

Tag.pre('save', function (next) {
    this.tagName = this.tagName.toLowerCase();
    next();
});

module.exports = mongoose.model('Tag', Tag);