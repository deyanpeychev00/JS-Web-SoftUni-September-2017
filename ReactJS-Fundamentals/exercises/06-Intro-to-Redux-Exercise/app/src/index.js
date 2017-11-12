import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Counter from './components/Counter';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux'

let reducer = (store, action) => {
    switch (action.type) {
        case 'INCREMENT': {
            console.log('increment');
            return store + 1;
        }
        case 'DECREMENT': {
            console.log('decrement');
            return store - 1;
        }
        case 'CLEAR': {
            console.log('clear');
            return 0;
        }
        case 'ADD_COUNTER': {
            return [...store, {index: store.length, value: 0}];
        }
        case 'REMOVE_LAST': {
            return [...store.slice(0, store.length - 1)];
        }
        default:
            return store
    }
};
let CounterWrapper = () => {
};

let firstDemo = () => {
    let separateStore = () => {
        console.log('---------UpdatedStore---------');
        console.log(store1.getState())
    };
    let store1 = createStore(
        (store, action) => {
            if (action.type === 'ADD_ELEMENT') {
                return store.concat(action.payload)
            }
            return store
        },
        ['Use Redux']
    );

    separateStore();
    for (let i = 1; i <= 10; i++) {
        store1.dispatch({
            type: 'ADD_ELEMENT',
            payload: [i]
        });
    }
    separateStore();
};
let secondDemo = () => {
    let separateStore = () => {
        console.log(store2.getState());
        console.log('---------UpdatedStore---------')
    };

    let store2 = createStore(reducer, 0);
    separateStore();
    store2.dispatch({
        type: 'INCREMENT'
    });
    store2.dispatch({
        type: 'INCREMENT'
    });
    separateStore();
    store2.dispatch({
        type: 'DECREMENT'
    });
    separateStore();
    store2.dispatch({
        type: 'CLEAR'
    });
    separateStore();

};
let thirdDemo = () => {
    let store = createStore(reducer, [{index: 0, value: 0}]);

    CounterWrapper = () => {
        return (
            <div>
                {store.getState().map(counter => {
                    return <Counter key={counter.index} props={counter}/>
                })}
                <button
                    className="addCounterButton"
                    onClick={() => {
                    store.dispatch({
                        type: 'ADD_COUNTER'
                    })
                }}>Add Counter
                </button>
                <button
                    className="removeCounterButton"
                    onClick={() => {
                    store.dispatch({
                        type: 'REMOVE_LAST'
                    })
                }}>Remove Last Counter
                </button>
            </div>
        );
    };

    store.subscribe(() => {
        ReactDOM.render(
            <div className="App">
                <CounterWrapper/>
            </div>, document.getElementById('root'));
    });
};

// firstDemo();
// secondDemo();
thirdDemo();

ReactDOM.render(
    <div className="App">
        <CounterWrapper/>
    </div>, document.getElementById('root'));
registerServiceWorker();
