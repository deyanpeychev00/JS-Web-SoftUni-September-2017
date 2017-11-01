const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 5389;

const handlers = require('./handlers');


http.createServer((req, res) => {
    req.pathname = url.parse(req.url).pathname;

    for (let handler of handlers) {
        let response = handler(req, res);

        if (response !== true) {
            break;
        }
    }

}).listen(port);

console.log(`Server listening on port ${port}..`);