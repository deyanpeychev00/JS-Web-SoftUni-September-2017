/**
 * Created by Deyan Peychev on 20-Oct-17.
 */
const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Hotel = require('mongoose').model('Hotel');
const Category = require('mongoose').model('Category');


module.exports = {
    deleteHotel: (req, res) => {
        let id = req.params.id;

        Hotel.findByIdAndRemove(id, (err, hotel) => {
            res.redirect('/')
        });
    },

    commentHotel: (req, res) => {
        let hotelId = req.params.hotelId;
        let commentBody = req.body;
        let commentObj = {
            userName: commentBody.userName,
            userComment: commentBody.comment,
            datePosted: new Date().toISOString().substr(0, 10)
        };

        Hotel.findById(hotelId).then((selectedHotel) => {
            selectedHotel.reviews.push(commentObj);
            selectedHotel.reviews.sort((a, b) => a.datePosted <= b.datePosted);
            selectedHotel.save().then(() => {
                res.render('hotels/details', {selectedHotel});
            });
        })
    },

    likeHotel: (req, res) => {
        let hotelId = req.params.hotelId;

        Hotel.findById(hotelId).then((selectedHotel) => {
            selectedHotel.likes++;
            selectedHotel.save().then(() => {
                res.redirect('/')
            }).catch((e) => {
                res.locals.globalError = e;
                res.render('hotels/details', {selectedHotel});
            })
        })
    },

    getHotelDetails: (req, res) => {
        let hotelId = req.query.id;
        Hotel.findById(hotelId).then((selectedHotel) => {
            selectedHotel.views++;
            selectedHotel.save().then(() => {
                res.render('hotels/details', {selectedHotel})
            }).catch((e) => {
                res.locals.globalError = e;
                res.render('/');
            });
        })
    },

    getAddCategory: (req, res) => {
        res.render('hotels/generateCategory');
    },

    postAddCategory: (req, res) => {
        let categoryObj = req.body;

        Category.create({
            title: categoryObj.title
        }).then(() => {
            res.redirect('/');
        }).catch((e) => {
            res.locals.globalError = e;
            res.render('hotels/generateCategory');
        })
    },

    showAllHotels: (req, res) => {

        let page = Number(req.query.page);

        if (Number.isNaN(page)) {
            page = 1;
        }

        let prevPage = page - 1;
        let nextPage = page + 1;

        if (prevPage <= 0) {
            prevPage = 1;
        }

        Hotel.find({}).sort('-creationDate').skip((page - 1) * 5).limit(5).then((hotels) => {
            res.render('hotels/hotelList', {hotels, pages: {prevPage, nextPage}});
        })
    },

    getGenerateHotel: (req, res) => {

        Category.find({}).then((categories) => {
            res.render('hotels/generateHotel', {categories});
        });

    },

    postGenerateHotel: (req, res) => {
        let hotelProps = req.body;

        Hotel.create({
            title: hotelProps.title,
            location: hotelProps.location,
            image: hotelProps.image,
            type: hotelProps.type,
            description: hotelProps.description,
            creationDate: Date.now(),
            reviews: [],
            views: 0,
            likes: 0
        }).then((hotel) => {
            res.redirect('/');
        }).catch((e) => {
            res.locals.globalError = e;
            res.render('hotels/generateHotel');
        })
    }
};

