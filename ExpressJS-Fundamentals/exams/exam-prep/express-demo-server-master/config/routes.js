const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.session.showAllHotels);
    app.get('/list', controllers.session.showAllHotels);
    app.get('/about', controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.get('/loginRegister', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    app.get('/addHotel', controllers.session.getGenerateHotel);
    app.post('/addHotel', controllers.session.postGenerateHotel);

    app.get('/addCategories', controllers.session.getAddCategory);
    app.post('/addCategories', controllers.session.postAddCategory);

    app.get('/user/:username', controllers.user.userDetails);
    app.get('/details', controllers.session.getHotelDetails);

    app.get('/like/:hotelId', controllers.session.likeHotel);
    app.post('/comment/:hotelId', controllers.session.commentHotel);

    app.post('/delete/:id', controllers.session.deleteHotel);

    app.get('/block/:id', controllers.user.blockUser);
    app.get('/unblock/:id', controllers.user.unblockUser);
    app.get('/manageUsers/:id', controllers.user.getManageUsers);
    app.get('/makeAdmin/:id', controllers.user.makeAdmin);
    app.get('/makeUser/:id', controllers.user.makeUser);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};