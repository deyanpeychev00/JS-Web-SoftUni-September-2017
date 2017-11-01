let express = require('express');
let router = express.Router();

let Genre = require('./../models/Genre');
let Meme = require('./../models/Meme');

function getAllMemes(res) {
    Meme.find({}).then((foundMemes) => {
        res.render('viewAll', {memes: foundMemes});
    })
}
function getMemesByTitle(title, res) {
    Meme.find({memeName: title}).then( (foundMemes) =>{
        res.render('viewAll', {memes: foundMemes});
    })
}
function getMemesByGenre(genre, res) {
    Meme.find({genreSelect: genre}).then( (foundMemes) =>{
        res.render('viewAll', {memes: foundMemes});
    })
}
function getSpecifiedMemes(title, genre, res) {
    Meme.find({genreSelect: genre, memeName:title}).then((foundMemes) =>{
        res.render('viewAll', {memes: foundMemes});
    })
}


router.get('/', function (req, res, next) {

    Genre.find({}).then((genres) => {
        res.render('search', {options: genres.map(g => g.genreName)});
    });
})
    .post('/', function (req, res, next) {
        let sTitle = req.body.memeTitle;
        let sGenre = req.body.genreSelect;
        if(sTitle === '' && sGenre === 'all'){
            getAllMemes(res);
        }else if (sTitle !== '' && sGenre === 'all'){
            getMemesByTitle(sTitle, res);
        }else if (sTitle === '' && sGenre !== 'all'){
            getMemesByGenre(sGenre, res);
        }else if (sTitle !== '' && sGenre !== 'all'){
            getSpecifiedMemes(sTitle, sGenre, res);
        }
    });

module.exports = router;
