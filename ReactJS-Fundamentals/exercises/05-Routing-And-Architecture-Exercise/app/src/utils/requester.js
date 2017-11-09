import appData from './dataCollector';

function handleAuthorisation(authType) {
    if (authType === 'basic') {
        return {
            'Authorization': 'Basic ' + btoa(`${appData.appId}:${appData.appSecret}`),
            'Content-Type': 'application/json'
        }
    } else if (authType === 'kinvey') {
        return {
            'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
            'Content-Type': 'application/json'
        }
    }
}

function generateHeader(method, authType, body) {
    if (body !== 'noBody') {
        return {
            method: method,
            headers: handleAuthorisation(authType),
            body: JSON.stringify(body)
        }
    } else {
        return {
            method: method,
            headers: handleAuthorisation(authType)
        }
    }
}

function returnPostsToCatalog(module, endpoint, method, authType, body, action) {
    return fetch(`${appData.url}/${module}/${appData.appId}${endpoint}`,
        generateHeader(method, authType, body))
        .then(res => {
            return res.json();
        });
}

function getCurrentPost(module, endpoint, method, authType, body, action) {
    return fetch(`${appData.url}/${module}/${appData.appId}${endpoint}`,
        generateHeader(method, authType, body))
        .then(res => {
            return res.json();
        });
}

function getPostComments(module, endpoint, method, authType, body, action) {
    return fetch(`${appData.url}/${module}/${appData.appId}${endpoint}`,
        generateHeader(method, authType, body))
        .then(res => {
            return res.json();
        });
}

function makeRequest(module, endpoint, method, authType, body, action, postId) {

    if (action === 'listPosts') {
        return returnPostsToCatalog(module, endpoint, method, authType, body, action);
    }else if (action === 'getCurrentPost'){
        return getCurrentPost(module, endpoint, method, authType, body, action);
    }else if (action === 'getPostComments'){
        return getPostComments(module, endpoint, method, authType, body, action)
    }else {
        fetch(`${appData.url}/${module}/${appData.appId}${endpoint}`,
            generateHeader(method, authType, body))
            .then(res => {
                if (action !== 'logout') {
                    return res.json();
                }
            }).then(parsedJSON => {
            if (parsedJSON) {
                if (parsedJSON.error === undefined) {
                    if (action === 'login' || action === 'register') {
                        localStorage.setItem('authtoken', parsedJSON._kmd.authtoken);
                        localStorage.setItem('username', parsedJSON.username);
                        console.log(action.charAt(0).toUpperCase() + action.slice(1) + ' successful.');
                        window.location.replace('/catalog');
                    } else if (action === 'logout') {
                        localStorage.clear();
                        console.log(action.charAt(0).toUpperCase() + action.slice(1) + ' successful.');
                        window.location.replace('/');
                    }else if (action === 'submitPost' || action === 'updatePost' || action === 'deletePost') {
                        window.location.replace('/catalog');
                    } else if (action === 'deleteComment'){
                        window.location.replace(`/comments/${postId}`)
                    } else if (action === 'postComment'){
                        window.location.replace(`/comments/${postId}`)
                    }else {
                        console.log(parsedJSON);
                    }
                } else {
                    console.log(parsedJSON.description);
                }
            } else {
                if (action === 'logout') {
                    localStorage.clear();
                    console.log(action.charAt(0).toUpperCase() + action.slice(1) + ' successful.');
                    window.location.replace('/');
                }else if (action === 'submitPost' || action === 'updatePost' || action === 'deletePost') {
                    window.location.replace('/catalog');
                } else if (action === 'deleteComment'){
                    window.location.replace(`/comments/${postId}`)
                } else if (action === 'postComment'){
                    window.location.replace(`/comments/${postId}`)
                }
            }
        });
    }
}


export default makeRequest;