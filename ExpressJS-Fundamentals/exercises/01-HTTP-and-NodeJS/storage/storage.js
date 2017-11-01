const fs = require('fs');
let db = {};

let put = (key, val)=>{
    if(typeof key !== "string"){
        console.log('Invalid credentials. Please try again.');
        return;
    }
    if(db.hasOwnProperty(key)){
        console.log('Key already exists.');
        return;
    }
    db[key] = val;
};
let get = (key) => {
    if(typeof key !=='string'){
        console.log('Invalid credentials. Please try again.');
        return;
    }
    if(!db.hasOwnProperty(key)){
        console.log('Cannot find the specified key in the database.');
        return;
    }
    return db[key];
};
let getAll = () => {
    if (Object.keys(db).length === 0){
        console.log('Database is empty.');
        return;
    }

    return db;
};
let update = (key, newVal) => {
    if(typeof key !=='string'){
        console.log('Invalid Credentials. Please try again.');
        return;
    }
    if(!db.hasOwnProperty(key)){
        console.log('Cannot find the specified key.');
        return;
    }
    db[key] = newVal;
};
let deleteItem = (key) => {
    if(typeof key !=='string'){
        console.log('Invalid Credentials. Please try again.');
        return;
    }
    if(!db.hasOwnProperty(key)){
        console.log('Cannot find the specified key.');
        return;
    }

    delete db[key];
};
let clear = () => {
    db = {};
};
let save = () => {
    fs.writeFileSync('./storage.json', JSON.stringify(db), 'utf8');
};
let load = () => {
    try{
        db = JSON.parse(fs.readFileSync('./storage.json', 'utf8'))
    }catch(err){
        console.log('Error loading data from storage.');
    }
};


module.exports =  {
    put: put,
    get:get,
    getAll: getAll,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load,
};

