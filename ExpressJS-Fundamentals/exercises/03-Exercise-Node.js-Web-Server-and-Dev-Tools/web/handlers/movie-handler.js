const fs = require('fs');
const qs = require('querystring');
let db = JSON.parse(fs.readFileSync('./config/db.json', 'utf8')).sort((a, b) => {
        return Number(b.movieYear) - Number(a.movieYear);
    }
);
const addMoviePath = './views/addMovie.html';
const viewMoviesPath = './views/viewAll.html';
const movieDetailsPath = './views/details.html';


let getAddMovie = (req, res) => {
    fs.readFile(addMoviePath, (err, data) => {
        if (err) {
            console.warn(err);
            return;
        }
        res.writeHead(200, {
            'content-type': 'text/html'
        });

        res.write(data);
        res.end();

    });
};
let viewAllMovies = (req, res) => {
    fs.readFile(viewMoviesPath, (err, data) => {
        if (err) {
            console.warn(err);
            return;
        }

        db = JSON.parse(fs.readFileSync('./config/db.json', 'utf8')).sort((a, b) => {
                return Number(b.movieYear) - Number(a.movieYear);
            }
        );

        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', () => {
            let html = '';
            for (let i = 0; i < db.length; i++) {
                html += `<div class="movie">
                <a href="/details/${i + 1}" data-id="${i + 1}"><img class="moviePoster" src="${decodeURIComponent(db[i].moviePoster)}"/></a>          
             </div>`;
            }

            return html;
        });

        res.writeHead(200, {
            'content-type': 'text/html'
        });

        res.write(data);
        res.end();

    });
};
let viewMovieDetails = (req, res) => {
    fs.readFile(viewMoviesPath, (err, data) => {
        if (err) {
            console.warn(err);
            return;
        }

        let movieToDisplay = db[Number(req.pathname.substr(-1)) - 1];
        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', () => {

            return `<div class="content">
                        <img src="${decodeURIComponent(movieToDisplay.moviePoster).split('+').join(' ')}" alt=""/>
                        <h3>Title:  ${decodeURIComponent(movieToDisplay.movieTitle).split('+').join(' ')}</h3>
                        <h3>Year: ${decodeURIComponent(movieToDisplay.movieYear).split('+').join(' ')}</h3>
                        <p>${decodeURIComponent(movieToDisplay.movieDescription).split('+').join(' ')}</p>
                    </div>`;
        });

        res.writeHead(200, {
            'content-type': 'text/html'
        });

        res.write(data);
        res.end();

    });
};

module.exports = (req, res) => {
    if (req.pathname === '/addMovie' && req.method === 'GET') {
        getAddMovie(req, res);
    }
    else if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
        viewAllMovies(req, res);
    }
    else if (req.pathname === '/addMovie' && req.method === 'POST') {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        })
            .on('end', () => {
                body = Buffer.concat(body).toString();
                let movieBody = qs.parse(body);
                let valid = true;

                for (let prop in movieBody) {
                    if (movieBody[prop] === '') {
                        valid = false;
                    }
                }

                if (valid) {
                    body = qs.parse(body);

                    let movie = {
                        "movieIndex": `${db.length + 1}`,
                        "movieTitle": encodeURIComponent(body.movieTitle).split(' ').join('+').toString(),
                        "moviePoster": encodeURIComponent(body.moviePoster).split(' ').join('+').toString(),
                        "movieDescription": encodeURIComponent(body.movieDescription).split(' ').join('+'),
                        "movieYear": encodeURIComponent(body.movieYear).split(' ').join('+')
                    };

                    db.push(movie);

                    fs.writeFileSync('./config/db.json', JSON.stringify(db), 'utf8');

                    fs.readFile(addMoviePath, (err, data) => {
                        if (err) {
                            console.warn(err);
                            return;
                        }
                        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                            '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');

                        res.writeHead(200, {
                            'content-type': 'text/html'
                        });

                        res.write(data);
                        res.end();

                    });
                } else {
                    fs.readFile(addMoviePath, (err, data) => {
                        if (err) {
                            console.warn(err);
                            return;
                        }
                        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                            '<div id="errBox"><h2 id="errMsg">Please Fill All Fields</h2></div>');

                        res.writeHead(200, {
                            'content-type': 'text/html'
                        });

                        res.write(data);
                        res.end();

                    });
                }
            })
    }
    else if (req.pathname.startsWith('/details') && req.method === 'GET') {
        viewMovieDetails(req, res);
    }
    else {
        return true;
    }
};