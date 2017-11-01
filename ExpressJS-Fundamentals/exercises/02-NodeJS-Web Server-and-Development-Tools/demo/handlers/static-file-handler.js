
module.exports = (req,res) => {
    if (urlData.startsWith('/styles')) {
        fs.readFile('.' + req.path, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            if (req.path.endsWith('.css')) {
                res.writeHead(200, {
                    'content-type': 'text/css'
                });
            } else if (req.path.endsWith('.js')) {
                res.writeHead(200, {
                    'content-type': 'application/javascript'
                });
            }
            res.write(data);
            res.end()
        });
    }
};