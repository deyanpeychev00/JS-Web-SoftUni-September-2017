const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    makeAdmin: (req, res) => {
        let id = req.params.id;
        User.findById(id).then((user) => {
            user.isAdmin = true;
            user.roles = ["Admin"];

            user.save().then(() => {
                res.locals.successMessage = 'User role changed successfully to Admin.';
                res.render('home/about');
            })
        })
    },
    makeUser: (req, res) => {
        let id = req.params.id;
        User.findById(id).then((user) => {
            user.isAdmin = false;
            user.roles = [];

            user.save().then(() => {
                res.locals.successMessage = 'User role changed successfully to User.';
                res.render('home/about');
            })
        })
    },
    getManageUsers: (req, res) => {
      User.find({}).then((allUsers) => {
          res.render('users/manageUsers', {allUsers});
      })
    },
    blockUser: (req, res) => {
        let userId =req.params.id;
        User.findById(userId).then((user) => {
            user.isBlocked = true;
            user.save().then(() => {
                res.locals.successMessage = 'User successfully blocked.';
                res.render('home/about');
            })
        })
    },
    unblockUser: (req, res) => {
        let userId =req.params.id;
        User.findById(userId).then((user) => {
            user.isBlocked = false;
            user.save().then(() => {
                res.locals.successMessage = 'User successfully unblocked.';
                res.render('home/about');
            })
        })
    },
    userDetails: (req, res) => {
        let username = req.params.username;
        User.find({username: username}).then((user) => {
            res.render('users/userDetails', {user: user});
        });
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
                roles: [],
                isAdmin: false
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
            res.render('users/loginRegister');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/loginRegister');
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
            res.render('users/loginRegister');
        }
    }
};