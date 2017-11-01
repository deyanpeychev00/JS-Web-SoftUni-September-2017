const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Doner = require('mongoose').model('Doner');

module.exports = {
    postEditProduct: (req, res) => {
        let productId = req.params.productId;
        let productBody = req.body;

        console.log(productBody);

        let editProd = {
            category: productBody.category.toLowerCase(),
            image: productBody.image,
            size: Number(productBody.size),
            toppings: productBody.toppings.split(', ')
        };

        Doner.findByIdAndUpdate(productId, {
            category: editProd.category,
            image: editProd.image,
            size: editProd.size,
            toppings: editProd.toppings
        }, () => {
            Doner.find({category: 'beef'}).then((beefDoners) => {
                Doner.find({category: 'chicken'}).then((chickenDoners) => {
                    Doner.find({category: 'lamb'}).then((lambDoners) => {
                        res.render('home/index', {beefDoners, chickenDoners, lambDoners});
                    });
                });
            });
        });
    },
    getEditProduct: (req, res) => {
        let productId = req.params.productId;
        Doner.findById(productId).then((doner) => {
            let toppingsList = doner.toppings.join(', ');
            doner.category = doner.category.charAt(0).toUpperCase() + doner.category.slice(1);
            res.render('admin/editProduct', {doner: doner, toppingsList: toppingsList});
        });
    },
    deleteProduct: (req, res) => {
        let productId = req.params.productId;
        // when you don't have enough callbacks, you can always add one more :)
        Doner.findByIdAndRemove(productId, (err, goodButGoneDoner) => {
            Doner.find({category: 'beef'}).then((beefDoners) => {
                Doner.find({category: 'chicken'}).then((chickenDoners) => {
                    Doner.find({category: 'lamb'}).then((lambDoners) => {
                        res.render('home/index', {beefDoners, chickenDoners, lambDoners});
                    });
                });
            });
        })
    },
    postEditOrder: (req, res) => {
        let orderId = req.params.orderId;
        let orderBody = req.body;
        User.find({}).then((allUsers) => {
            for (let user of allUsers) {
                for (let order of user.orders) {
                    if (order._id == orderId) {
                        let editedOrder = {
                            _id: order._id,
                            category: order.category,
                            image: order.image,
                            size: order.size,
                            toppings: order.toppings,
                            ordererId: order.ordererId,
                            orderDate: order.orderDate,
                            status: orderBody.status
                        };
                        let orderIndex = user.orders.indexOf(order);

                        user.orders.splice(orderIndex, 1);
                        user.orders.push(editedOrder);

                        user.save().then(() => {
                            Doner.find({category: 'beef'}).then((beefDoners) => {
                                Doner.find({category: 'chicken'}).then((chickenDoners) => {
                                    Doner.find({category: 'lamb'}).then((lambDoners) => {
                                        res.render('home/index', {beefDoners, chickenDoners, lambDoners});
                                    });
                                });
                            });
                        });
                    }
                }
            }
        });
    },
    getEditOrder: (req, res) => {
        let orderId = req.params.orderId;
        User.find({}).then((allUsers) => {
            for (let eachUser of allUsers) {
                for (let order of eachUser.orders) {
                    if (order._id == orderId) {
                        res.render('admin/editOrder', {order});
                    }
                }
            }
        });
    },
    getManageOrders: (req, res) => {
        // it's getting tough here ...
        let allOrders = [];
        User.find({}).then((users) => {
            for (let user of users) {
                for (let order of user.orders) {
                    allOrders.push(order);
                }
            }

            res.render('admin/manageOrders', {allOrders});
        })
    },
    getAddProduct: (req, res) => {
        res.render('admin/addProduct');
    },
    postAddProduct: (req, res) => {
        let donerBody = req.body;
        let toppings = donerBody.toppings.split(', ');

        let donerObj = {
            category: donerBody.category,
            image: donerBody.imageUrl,
            size: Number(donerBody.size),
            toppings: toppings
        };

        Doner.create(donerObj).then((doner) => {
            Doner.find({category: 'beef'}).then((beefDoners) => {
                Doner.find({category: 'chicken'}).then((chickenDoners) => {
                    Doner.find({category: 'lamb'}).then((lambDoners) => {
                        res.render('home/index', {beefDoners, chickenDoners, lambDoners});
                    });
                });
            });
        }).catch((e) => {
            res.locals.globalError = e;
            res.redirect('/addProduct');
        })
    }
};