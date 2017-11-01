let express = require('express');
let router = express.Router();

let Meme = require('./../models/Meme');

router.get('/', function(req, res, next) {
    Meme.find({}).then((memes) => {
        res.render('viewAll', {memes: memes});
    });
});

module.exports = router;
