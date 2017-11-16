async function register(name, email, password) {
    const res = await fetch('http://localhost:5000/auth/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });

    return await res.json();
}

async function login(email, password) {
    const res = await fetch('http://localhost:5000/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    return await res.json();
}

export {
    register,
    login
}