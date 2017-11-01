const home = require('./home-controller');
const user = require('./user-controller');
const admin = require('./admin-controller');
const query = require('./query-controller');
const rent = require('./rent-controller');

module.exports = {
    home,
    user,
    admin,
    query,
    rent
};