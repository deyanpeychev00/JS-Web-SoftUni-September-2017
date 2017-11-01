/**
 * Created by Deyan Peychev on 01-Nov-17.
 */
let functions = {};

let observerMenu ={
    addObserver: (name, func) => {
        functions[name] = func;
    },
    executeObserver: (name, param) => {
      functions[name](param);
    }
};

export default observerMenu;