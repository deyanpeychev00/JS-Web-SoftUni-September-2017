export default (store = {}, action) => {
    switch (action.type) {
        case 'AJAX_CALL': {
            console.log('-> Fetching data...');
            return store;
        }
        case 'AJAX_END': {
            console.log('-> Fetching finished.');
            return store;
        }
        default: {
            return store;
        }
    }
}