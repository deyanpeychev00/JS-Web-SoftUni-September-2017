/**
 * Created by Deyan Peychev on 18-Oct-17.
 */
const ObjectId = require('mongoose').Schema.Types.ObjectId;
const Car = require('mongoose').model('Car');
const User = require('mongoose').model('User');

module.exports = {
    endRental: (req, res) => {
        let carId = req.params.id;

        Car.findById(carId).then((car) => {
            car.isRent = false;
            car.rentFrom = " ";

            car.save().then(() => {
                let userId = req.user._id;
                User.findById(userId).then((foundUser) => {
                   let rentCars = foundUser.cars;
                   let rentIndex = rentCars.indexOf(carId);

                   if(rentIndex !== -1){
                       foundUser.cars.splice(rentIndex, 1);
                   }

                   foundUser.save().then(() =>{
                       res.redirect('/')
                   }).catch((err) => console.log(err));

                });
            }).catch((err) => console.log(err));
        });
    },

    rentCars: (req, res) => {
        let userId = req.params.id;

        Car.find({rentFrom: userId}).sort('-creationDate').then((cars) => {
            res.render('query/rentCars', {cars, userId: userId});
        })
    },

    deleteCar: (req, res) => {
        let carId = req.params.id;
        Car.findByIdAndRemove(carId, (err, data) => {
            User.find({}).then((users) => {
                for (let user of users) {
                    let ownedCars = user.ownedCars;
                    let rentCars = user.cars;
                    let ownedIndex = ownedCars.indexOf(carId);
                    let rentIndex = rentCars.indexOf(carId);

                    if (ownedIndex > -1) {
                        ownedCars.splice(ownedIndex, 1);
                    }
                    if (rentIndex > -1) {
                        rentCars.splice(rentIndex, 1);
                    }

                    user.save();
                }
                res.redirect('/');
            })
        });
    },

    editCarGet: (req, res) => {
        let carId = req.params.id;
        Car.find({_id: carId}).then((car) => {
            res.render('rent/editCar', {car});
        })
    },
    editCarPost: (req, res) => {
        let carId = req.params.id;
        let carBody = req.body;
        console.log(carId, carBody);

        Car.findOneAndUpdate({_id: carId}, {
            $set: {
                mark: carBody.mark,
                model: carBody.model,
                image: carBody.image,
                year: carBody.year,
                price: Number(carBody.price)
            }
        }, {new: true}, function (err, updatedCar) {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            res.redirect('/');
        });
    },
    myCars: (req, res) => {
        let userId = req.user.id;

        Car.find({owner: userId}).sort('-creationDate').then((cars) => {
            res.render('query/myCars', {cars});
        })
    },

    addCarView: (req, res) => {
        res.render('admin/addCar');
    },
    addCar: (req, res) => {
        let carData = req.body;
        let userId = req.params.id;

        User.findById(userId).then((user) => {
            let car = {
                mark: carData.mark,
                model: carData.model,
                image: carData.image,
                year: carData.year,
                price: carData.price,
                isRent: false,
                creationDate:  Date.now(),
                owner: user,
                rentFrom: "absolutelyfuckingnobody!@#$%^^&&%#@*^%(*#@^%*(@#",
            };

            Car.create(car).then((car) => {

                user.ownedCars.push(car);
                user.save();
                res.redirect('/');
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }
};