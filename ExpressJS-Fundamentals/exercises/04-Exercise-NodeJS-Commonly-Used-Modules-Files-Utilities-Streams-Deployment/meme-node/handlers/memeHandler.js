const fs = require('fs');
const allMemesHTML = './views/viewAll.html';
const addMemeHTML = './views/addMeme.html';
const memeDetailsHTML = './views/details.html';
const db = require('./../config/dataBase');
const formidable = require('formidable');
const shortid = require('shortid');

let memeGenerator = (id, title, memeSrc, description, privacy) => {
    return {
        id: id,
        title: title,
        memeSrc: memeSrc,
        description: description,
        privacy: privacy,
        dateStamp: Date.now()
    }
};

let viewAll = (req, res) => {
    let memes = db.getDb()
        .sort((a, b) => {
            return b.dateStamp - a.dateStamp;
        })
        .filter(meme => {
            return meme.privacy === 'on';
        });

    fs.readFile(allMemesHTML, (err, data) => {
        if (err) {
            console.warn(err);
            return;
        }

        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', () => {
            let html = '';
            for (let i = 0; i < memes.length; i++) {
                html += `<div class="meme">
                    <a href="/getDetails?id=${memes[i].id}" data-id="${memes[i].id}">
                    <img class="memePoster" src="${memes[i].memeSrc}"/>
                    </div>
                    `;
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
let viewAddMeme = (req, res) => {
    fs.readFile(addMemeHTML, (err, data) => {
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
let addMeme = (req, res) => {
    let form = new formidable.IncomingForm();
    let dbLen = Math.ceil(db.getDb().length / 10);
    let fileName = shortid.generate();
    let filePath = `./public/memeStorage/${dbLen}/${fileName}.jpg`;

    form.on('error', (err) => {
        console.log(err);
        return;
    }).on('fileBegin', (name, file) => {
        fs.access(`./public/memeStorage/${dbLen}`, (err) => {
            if (err) {
                console.log(err);
                fs.mkdirSync(`./public/memeStorage/${dbLen}`);
            }
        });
        file.path = filePath;
    });

    form.parse(req, function (err, fields, files) {
        let id = shortid.generate();
        let newMeme = memeGenerator(id, fields.memeTitle, filePath, fields.memeDescription, fields.status);

        db.add(newMeme);
        db.save()
            .then(() => {
                viewAddMeme(req,res);
            });
    });

};
let getDetails = (req, res) => {
    fs.readFile(memeDetailsHTML, (err, data) => {
        if (err) {
            console.warn(err);
            return;
        }

        let memes = db.getDb();

        let targetedMeme = {};
        for (let meme of memes) {
            if (req.url.endsWith(meme.id)) {
                targetedMeme = meme;
                break;
            }
        }

        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', () => {
            return `<div class="content">
                        <img src="${targetedMeme.memeSrc}" alt=""/>
                        <h3>Title  ${targetedMeme.title}</h3>
                        <p> ${targetedMeme.description}</p>
                        <button><a href="${targetedMeme.memeSrc}" download="${targetedMeme.title}">Download Meme</a></button>
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
    if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
        viewAll(req, res);
    } else if (req.pathname === '/addMeme' && req.method === 'GET') {
        viewAddMeme(req, res);
    } else if (req.pathname === '/addMeme' && req.method === 'POST') {
        addMeme(req, res);
    } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
        getDetails(req, res);
    } else {
        return true;
    }
};
