const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 1790;
const favicon = '/favicon.ico';

http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname;
    if (path === '/') {
        // TODO: home handler
    } else if (path === favicon) {
        // TODO: favicon handler
    } else if (urlData.startsWith('/styles')) {
        fs.readFile('.' + urlData, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            if (urlData.endsWith('.css')) {
                res.writeHead(200, {
                    'content-type': 'text/css'
                });
            } else if (urlData.endsWith('.js')) {
                res.writeHead(200, {
                    'content-type': 'application/javascript'
                });
            }
            res.write(data);
            res.end()
        });
    }
    else
        {
            fs.readFile('./404.html', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                res.writeHead(404, {
                    'content-type': 'text/html'
                });
                res.write(data);
                res.end();
            });
        }
    }
    ).listen(port);

console.log(`Server listening on port ${port}...`);

