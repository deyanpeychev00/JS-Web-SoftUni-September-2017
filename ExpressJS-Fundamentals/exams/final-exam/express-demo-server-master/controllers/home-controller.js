const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Doner = require('mongoose').model('Doner');

module.exports = {
    index: (req, res) => {
        Doner.find({category: 'beef'}).then((beefDoners) => {
           Doner.find({category: 'chicken'}).then((chickenDoners) => {
               Doner.find({category: 'lamb'}).then((lambDoners) => {
                   res.render('home/index', {beefDoners, chickenDoners, lambDoners});
               });
           });
        });
    },
    about: (req, res) => {
        res.render('home/about');
    }
};