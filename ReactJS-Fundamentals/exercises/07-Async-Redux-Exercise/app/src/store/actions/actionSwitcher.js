const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';

export default {
    login: (payload) => {
        return {
            type: LOGIN,
            payload: payload
        }
    }
}