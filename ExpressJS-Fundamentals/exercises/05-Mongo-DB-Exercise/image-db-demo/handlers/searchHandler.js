const fs = require('fs');
const mongoose = require('mongoose');
const Tag = require('./../models/TagSchema');
const Image = require('./../models/ImageSchema');

module.exports = (req, res) => {
    if (req.pathname === '/search') {

        let pathquery = req.pathquery;

        Tag.find({}).populate('images').then((data) => {
            let images = [];

            for (let tag of data) {
                for (let image of tag.images) {
                    images.push(image);
                }
            }

            let uniqueImages = images.filter(function (item, pos) {
                return images.indexOf(item) === pos;
            });

            fs.readFile('./views/results.html', (err, data) => {
                if (err) {
                    console.warn(err);
                    return;
                }

                res.writeHead(200, {
                    'content-type': 'text/html'
                });

                let imgHTML = '';

                if((pathquery.tagName === 'Write tags seperated by ,' || pathquery.tagName === '')
                    && pathquery.afterDate === ''
                    && pathquery.beforeDate === ''
                    && pathquery.Limit === ''){
                    for (let img of uniqueImages) {

                        imgHTML += `<fieldset id => <legend>${img.imageTitle}:</legend> 
                                    <img src="${img.imageUrl}">
                                    </img><p>${img.description}<p/>
                                    <button onclick='location.href="/delete?id=${img._id}"'class='deleteBtn'>Delete
                                    </button>
                                </fieldset>`
                    }
                }
                // TODO: complete search filter


                data = data.toString().replace(`<div class='replaceMe'></div>`, imgHTML);

                res.write(data);
                res.end();


            });
        })
    } else {
        return true
    }
};
