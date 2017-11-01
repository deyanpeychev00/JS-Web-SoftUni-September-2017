const fs = require('fs');
const filePath = './views/home.html';

module.exports = (req, res) => {

    if (req.pathname === '/' && req.method === 'GET'){
        fs.readFile(filePath, (err, data) => {
            if(err){
                console.warn(err);
                return;
            }

            res.writeHead(200, {
               'content-type': 'text/html'
            });

            res.write(data);
            res.end();
        })
    }else{
        return true;
    }
};