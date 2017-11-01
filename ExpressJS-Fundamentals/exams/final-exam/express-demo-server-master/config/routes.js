const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    // add product router
    app.get('/addProduct', restrictedPages.hasRole('Admin'), controllers.admin.getAddProduct);
    app.post('/addProduct', restrictedPages.hasRole('Admin'), controllers.admin.postAddProduct);

    // order product router
    app.get('/customizeOrder/:id', controllers.user.getCustomizeOrder);
    app.post('/orderProduct/:userId', controllers.user.orderProduct);

    // user order status router
    app.get('/orderStatus/:userId', controllers.user.getOrderStatus);

    // order details router
    app.get('/orderDetails/:orderId', controllers.user.displayOrderDetails);

    // ADMIN: manage & edit orders router
    app.get('/manageOrders', restrictedPages.hasRole('Admin'), controllers.admin.getManageOrders);
    app.get('/editOrder/:orderId', restrictedPages.hasRole('Admin'), controllers.admin.getEditOrder);
    app.post('/editOrder/:orderId', restrictedPages.hasRole('Admin'), controllers.admin.postEditOrder);

    // ADMIN: edit & delete products router
    app.get('/deleteProduct/:productId', restrictedPages.hasRole('Admin'), controllers.admin.deleteProduct);
    app.get('/editProduct/:productId', restrictedPages.hasRole('Admin'), controllers.admin.getEditProduct);
    app.post('/editProduct/:productId', restrictedPages.hasRole('Admin'), controllers.admin.postEditProduct);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};