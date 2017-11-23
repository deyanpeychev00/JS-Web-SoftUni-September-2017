// functions & variables
let reducerFunc = (...params: number[]): void => {
    let tempSumator: number = 0;

    params.map(num => {
        tempSumator+=num;
    });

    console.log(tempSumator);
};


reducerFunc(1,2,3,4,5);
console.log('----------');


// jQuery
//let naze = document.querySelector('.pesho');

// classes
class Car {
    private color:string;
    private engine: string;

    constructor(color:string, engine:string){
        this.color = color;
        this. engine = engine;
    }

    start(){
        console.log(`My color is ${this.color}.\nI have ${this.engine} engine.`);
    }
}

let Audi = new Car("black", "v10 biturbo");

Audi.start();
console.log('----------');

// interfaces

interface human {
    name?: string;
    age: number;
    readonly birth: number;
}

let john = {
    name: 'John',
    age: 21,
    birth: 22
};

// optional props obj
let peter:human = {
    name: 'Peter',
    age: 33,
    birth: 12
};

let calendar = (...params:human[]/*Array<human>*/) => {
    params.map(h => {
        console.log(h);
    })
};

calendar(john, peter);

peter.name = 'Max';
// peter.birth = 30; /* read-only */

console.log('----------');
calendar(john, peter);
