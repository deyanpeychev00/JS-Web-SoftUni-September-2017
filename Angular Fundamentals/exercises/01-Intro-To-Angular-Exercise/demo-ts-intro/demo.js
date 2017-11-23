"use strict";
// functions & variables
var reducerFunc = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var tempSumator = 0;
    params.map(function (num) {
        tempSumator += num;
    });
    console.log(tempSumator);
};
reducerFunc(1, 2, 3, 4, 5);
console.log('----------');
// jQuery
//let naze = document.querySelector('.pesho');
// classes
var Car = /** @class */ (function () {
    function Car(color, engine) {
        this.color = color;
        this.engine = engine;
    }
    Car.prototype.start = function () {
        console.log("My color is " + this.color + ".\nI have " + this.engine + " engine.");
    };
    return Car;
}());
var Audi = new Car("black", "v10 biturbo");
Audi.start();
console.log('----------');
var john = {
    name: 'John',
    age: 21,
    birth: 22
};
// optional props obj
var peter = {
    name: 'Peter',
    age: 33,
    birth: 12
};
var calendar = function () {
    var params = []; /*Array<human>*/
    for (var _i = 0 /*Array<human>*/; _i < arguments.length /*Array<human>*/; _i++ /*Array<human>*/) {
        params[_i] = arguments[_i]; /*Array<human>*/
    }
    params.map(function (h) {
        console.log(h);
    });
};
calendar(john, peter);
peter.name = 'Max';
// peter.birth = 30; /* read-only */
console.log('----------');
calendar(john, peter);
