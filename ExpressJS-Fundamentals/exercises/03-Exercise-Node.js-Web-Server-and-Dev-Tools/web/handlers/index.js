const homeHandler = require('./home-handler');
const staticHandler = require('./static-handler');
const movieHandler = require('./movie-handler');

module.exports = [staticHandler, homeHandler, movieHandler];

