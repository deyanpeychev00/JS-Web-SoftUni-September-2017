function auth(token) {
    return token !== '' && token !== 'undefined' && typeof(localStorage.authtoken) !== 'undefined';
}

export default auth;