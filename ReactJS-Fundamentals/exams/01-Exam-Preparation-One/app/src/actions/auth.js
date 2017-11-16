import {login, register} from "../api/remote";
import {REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED} from "./types";

function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    }
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

function registerAction(name, email, password) {
    return (dispatch) => {
        return register(name, email, password)
            .then(json => {
                if (json.success) {
                    dispatch(registerSuccess());
                }
            });
    }
}

function loginAction(email, password) {
    return (dispatch) => {
        return login(email, password)
            .then(json => {
                localStorage.setItem('authtoken', json.token);
                localStorage.setItem('user', json.user.name);
                dispatch(loginSuccess());
            });
    }
}

function redirect() {
    return{
        type: REDIRECTED
    }
}

export {
    registerAction,
    loginAction,
    redirect
}