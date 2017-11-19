const host = 'http://localhost:5000/';

async function register(name, email, password, repeatPassword) {
    if(name === ''){
        return {
            success: false,
            message: "Please tell us your name, don't be so shy."
        }
    }
    if(email === ''){
        return {
            success: false,
            message: "Please tell us your e-mail, don't be so shy."
        }
    }
    if(password === '' || repeatPassword === ''){
        return {
            success: false,
            message: "Please fill the password fields."
        }
    }
    if(password.length < 4 || repeatPassword.length < 4){
        return {
            success: false,
            message: "Password must be at least 4 characters long."
        }
    }
    if(password !== repeatPassword){
        return {
            success: false,
            message: "It would be good if the passwords are the same."
        }
    }

    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
}

async function getYearlyBalance() {
    const res = await fetch(host + 'plan/'+new Date().getFullYear(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        }
    });
    return await res.json();
}

async function getMonthlyBallance(monthNum) {
    const res = await fetch(host + `plan/${new Date().getFullYear()}/${monthNum}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        }
    });
    return await res.json();
}

async function updateMonthIncome(obj, monthNum) {

    const res = await fetch(host + `plan/${new Date().getFullYear()}/${monthNum}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        },
        body: JSON.stringify(obj)
    });
    return await res.json();
}

async function postExpense(obj, monthNum) {
    const res = await fetch(host + `plan/${new Date().getFullYear()}/${monthNum}/expense`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        },
        body: JSON.stringify(obj)
    });
    return await res.json();
}

async function removeExpense(id) {
    const res = await fetch(host + `plan/expense/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        },
    });
    return await res.json();
}

export { register, login, getYearlyBalance, getMonthlyBallance, updateMonthIncome, postExpense, removeExpense };