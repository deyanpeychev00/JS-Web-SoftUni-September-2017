const mongoose = require("mongoose");
const path = "mongodb://localhost:27017/meme-db";
mongoose.Promise = global.Promise;


module.exports = mongoose.connect(path, {
    useMongoClient: true
});