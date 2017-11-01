/**
 * Created by Deyan Peychev on 15-Oct-17.
 */
let express = require('express');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
let router = express.Router();

const Genre = require('./../models/Genre');

router
    .get('/', function (req, res, next) {
        res.render('addGenre');
    })
    .post('/', (req, res, next) => {
        let obj = req.body;

        Genre.create(obj).then((data) => {
            res.render('addGenre', {status: true});
        }).catch((err) => {
            console.warn(err);
        });
    });

module.exports = router;
