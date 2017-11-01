/**
 * Created by Deyan Peychev on 13-Oct-17.
 */
const express = require('express');
const port = 5000;
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

/*app.all('/', (req, res, next) => {
    console.log('Middleware execution..');
    next();
}), (req,res) => {
    res.send('All handler')
};

app.get('/', (req, res) =>{
    res.status(200);
    res.send('Welcome to express!');
});

app.post('/', (req, res) => {
   res.send('POST request on home');
});

app.put('/', (req, res) => {
    res.send('PUT request on home');
});*/

/*
app.route('/')
    .get((req, res) =>{
        res.status(200);
        res.send('Welcome to express!');
    })
    .post((req, res) => {
        res.send('POST request on home');
    })
    .put((req, res) => {
        res.send('PUT request on home');
    })
    .all((req,res) => {
        res.send('Everything else')
    });
*/

// Middleware usage

/*
app.use((req, res, next) => {
    console.log('Time: ' + Date.now());
    next();
});

app.get('/', (req,res) => {
    res.send('Default page');
});
*/

app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
/*
app.use('/user/:userId', (req, res, next) => {
    let userId = req.params.userId;

    let userExists = false;

    if(!userExists){
        res.redirect('/login.html');
    }else{
        next();
    }
});*/

app.post('/login', (req,res) => {
    console.log(req.body);
    res.redirect('/home');
});

app.get('/home', (req,res) => {
    res.send('Home Page');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}..`);
});
