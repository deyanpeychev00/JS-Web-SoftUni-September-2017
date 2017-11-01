const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let Image = new mongoose.Schema({
    imageUrl: {type: String, required: true},
    imageTitle: {type: String, required: true},
    creationDate: {type: Date, default: Date.now()},
    description: {type: String, required: true},
    tags: [{type: ObjectId}]
});

module.exports = mongoose.model('Image', Image);
