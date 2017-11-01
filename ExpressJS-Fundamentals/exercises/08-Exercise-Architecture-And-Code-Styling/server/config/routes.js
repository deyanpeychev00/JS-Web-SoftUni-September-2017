const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
   //  app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);
    app.get('/about', controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    //Admin functionality
    app.get('/addCar', controllers.admin.addCarView);
    app.post('/addCar/user/:id', controllers.admin.addCar);

    app.get('/user/:id/myCars', controllers.admin.myCars);

    app.get('/user/:id/rentCars', controllers.admin.rentCars);
    app.post('/endRental/:id', controllers.admin.endRental);

    app.get('/edit/:id', controllers.admin.editCarGet);
    app.post('/edit/:id', controllers.admin.editCarPost);

    app.post('/delete/:id', controllers.admin.deleteCar);

    //Query functionality
    app.get('/viewAll', controllers.query.queryAll);

    //Rent a car
    app.get('/details/:id', controllers.rent.getDetails);
    app.post('/rent/:id', controllers.rent.rentCar);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};