let express = require('express');
let router = express.Router();

const Genre = require('./../models/Genre');
const Meme = require('./../models/Meme');

router.get('/', function (req, res, next) {

    Genre.find({}).then((genres) => {
        let tags = [];

        for (let obj of genres) {
            tags.push(obj.genreName);
        }
        res.render('addMeme', {tags});
    });

}).post('/', function (req, res) {
    let memeObj = req.body;

    console.log(memeObj);


    Meme.create(memeObj).then((meme) => {
        let targetGenre = memeObj.genreSelect;

        Genre.findOne({genreName: targetGenre}).then((genre) => {

            genre.memeList.push(meme._id);
            genre.save().then(() => {
                res.render('addMeme', {status: true});
            }).catch((err) => {
                console.warn(err);
                return;
            })
        }).catch((err) => {
            console.warn(err);
        });
    });
});


module.exports = router;
