/**
 * Created by Deyan Peychev on 18-Oct-17.
 */
const Car = require('mongoose').model('Car');
const User = require('mongoose').model('User');
module.exports = {
    getDetails: (req, res) => {
        let id = req.params.id;
        Car.findById(id).then((car) => {
            res.render('rent/rentCar', {car})
        });
    },

    rentCar: (req, res) => {
        let id = req.params.id;
        let userId = req.user.id;
        Car.findById(id).then((car) => {
            car.isRent = true;
            car.rentFrom = userId;
            car.save().then(() => {
                User.findById(userId).then((user) => {
                    user.cars.push(car._id);
                    user.save().then(() => {
                        res.redirect('/');
                    }).catch((err) => console.log(err));
                }).catch((err) => console.log(err));
            }).catch((err) => console.log(err))
        })
    }
};