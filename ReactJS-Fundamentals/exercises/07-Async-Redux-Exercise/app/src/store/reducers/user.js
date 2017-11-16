// import users from './../../seed/users';
/*
let altUser = {
    "_id": "59ae8fc9797e4f82047d0ea3",
    "subscriptions": [
        "vako",
        "SoftUni"
    ],
    "username": "Pesho",
    "_acl": {
        "creator": "59ae8fc9797e4f82047d0ea3"
    },
    "_kmd": {
        "lmt": "2017-09-05T16:03:36.205Z",
        "ect": "2017-09-05T11:51:37.043Z"
    }
};
*/

export default (store = {}, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return store;
        }
        default: {
            return store;
        }
    }
}