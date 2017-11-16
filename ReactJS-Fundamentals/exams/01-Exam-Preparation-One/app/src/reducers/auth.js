import {LOGIN_SUCCESS, REDIRECTED, REGISTER_SUCCESS} from "../actions/types";

export function registerReducer(state = {success: false}, action) {
    switch (action.type) {
        case REGISTER_SUCCESS: {
            return Object.assign({}, state, {success: true});
        }
        case LOGIN_SUCCESS: {
            return Object.assign({}, state, {success: false});
        }
        case REDIRECTED: {
            return Object.assign({}, state, {success: false});
        }
        default: {
            return state;
        }
    }
}

export function loginReducer(state = {success: false}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return Object.assign({}, state, {success: true});
        }
        case REDIRECTED: {
            return Object.assign({}, state, {success: false});
        }
        default: {
            return state;
        }
    }
}