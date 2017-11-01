/**
 * Created by Deyan Peychev on 18-Oct-17.
 */
const Car = require('mongoose').model('Car');

module.exports = {
    queryAll: (req, res) => {
        let page = Number(req.query.page);

        let prevPage = page - 1;
        let nextPage = page + 1;


        Car.find({isRent: false}).sort('-creationDate').skip(page * 5).limit(5).then((cars) => {

            if (prevPage < 0) {
                prevPage = 0;
            }

            let pageObj = {
                prevPage: prevPage,
                nextPage: nextPage
            };

            res.render('query/viewAll', {cars, pageObj});
        });
    },
};