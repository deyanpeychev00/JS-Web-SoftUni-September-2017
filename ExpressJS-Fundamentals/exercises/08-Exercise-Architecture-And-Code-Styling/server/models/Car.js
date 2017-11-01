const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CarSchema = new mongoose.Schema({
    mark: { type: mongoose.Schema.Types.String, required: true},
    model: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String, required:true },
    year: { type: Number, required:true },
    price: { type: Number, required:true },
    isRent: {type: Boolean, required:true, default:false},
    creationDate: {type: Date, required:true},
    owner: {type: ObjectId, ref:'User', required: true},
    rentFrom: {type: mongoose.Schema.Types.String, required: true, default:""}
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
