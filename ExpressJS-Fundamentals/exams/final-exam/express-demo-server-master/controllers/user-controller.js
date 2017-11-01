const encryption = require('../util/encryption');
const restrictedPages = require('../config/auth');
const User = require('mongoose').model('User');
const Doner = require('mongoose').model('Doner');

module.exports = {
    displayOrderDetails: (req, res) => {
        let orderId = req.params.orderId;
        let userId = req.user._id;

        User.findById(userId).then((user) => {
            for (let order of user.orders) {
                if (order._id == orderId) {
                    let isPending = false, isInProgress = false, isInTransit = false, isDelivered = false;

                    switch (order.status) {
                        case 'Pending': {
                            isPending = true;
                            break;
                        }
                        case 'In Progress': {
                            isInProgress = true;
                            break;
                        }
                        case 'In Transit': {
                            isInTransit = true;
                            break;
                        }
                        case 'Delivered': {
                            isDelivered = true;
                        }
                    }
                    res.render('users/orderDetails', {order, isPending, isInProgress, isInTransit, isDelivered });
                    return;
                }
            }
        })
    },
    getOrderStatus: (req, res) => {
        let userId = req.params.userId;
        User.findById(userId).then((user) => {
            res.render('users/myOrders', {orders: user.orders})
        })
    },
    orderProduct: (req, res) => {
        let userId = req.params.userId;
        let orderBody = req.body;

        let donerId = orderBody.product_id;
        Doner.findById(donerId).then((foundDoner) => {
            let donerToOrder = {};

            let editToppings = '';
            if (orderBody.hasOwnProperty('toppings')) {
                if (Array.isArray(orderBody.toppings)) {
                    editToppings = orderBody.toppings;
                } else {
                    editToppings = [orderBody.toppings];
                }
            }
            User.findById(userId).then((user) => {

                donerToOrder = {
                    _id: foundDoner._id,
                    category: foundDoner.category,
                    image: foundDoner.image,
                    size: foundDoner.size,
                    toppings: foundDoner.toppings,
                    ordererId: user._id,
                    orderDate: new Date().toISOString().substr(0, 10),
                    status: 'Pending'
                };

                user.orders.push(donerToOrder);
                user.save().then(() => {
                    res.render('users/orderedProductDetails', {donerToOrder});
                })
            })
        });
    },
    getCustomizeOrder: (req, res) => {
        restrictedPages.isAuthed(req, res, () => {
            let donerId = req.params.id;
            Doner.findById(donerId).then((foundDoner) => {
                res.render('users/customizeOrder', {foundDoner});
            });
        })
    },
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: []
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({username: reqUser.username});
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    }
};