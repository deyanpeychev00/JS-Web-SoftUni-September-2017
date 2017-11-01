/**
 * Created by Deyan Peychev on 15-Oct-17.
 */
let express = require('express');
let router = express.Router();

let Meme = require('./../models/Meme');

function getMemeDetails(req, res, next) {
    let id = req.params.id;
    Meme.find({_id: id}).then((foundMemes) => {
       res.render('memeDetails', {memes: foundMemes});
    });
}

module.exports = getMemeDetails;
