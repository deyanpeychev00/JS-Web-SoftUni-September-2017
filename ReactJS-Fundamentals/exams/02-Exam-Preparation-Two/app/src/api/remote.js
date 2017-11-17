const host = 'http://localhost:5000/';

async function register(name, email, password) {
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

async function getAllHotels() {
    const res = await fetch(host + 'hotels/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        }
    });
    return await res.json();
}

async function addHotel(hotel) {
    if (hotel.name === '') {
        return {
            success: false,
            message: 'Please enter a valid hotel name'
        }
    }
    if (hotel.description === '') {
        return {
            success: false,
            message: 'Please enter a valid hotel description'
        }
    }
    if (hotel.location === '') {
        return {
            success: false,
            message: 'Please enter a valid hotel location'
        }
    }
    if (hotel.image === '' || !hotel.image.startsWith('http')) {
        return {
            success: false,
            message: 'Please enter a valid hotel image url'
        }
    }

    const res = await fetch(host + 'hotels/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        },
        body: JSON.stringify(hotel)
    });
    return await res.json();
}

async function getCurrentHotel(hotelId) {
    const res = await fetch(host + 'hotels/details/' + hotelId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        }
    });
    return await res.json();
}

async function getHotelReviews(hotelId) {
    const res = await fetch(host + 'hotels/details/'+hotelId+'/reviews', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        }
    });
    return await res.json();
}

async function addReview(review, hotelId) {
    if (review.comment === '') {
        return {
            success: false,
            message: 'Please leave a comment'
        }
    }

    const res = await fetch(host + 'hotels/details/'+hotelId+'/reviews/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authtoken')
        },
        body: JSON.stringify(review)
    });
    return await res.json();
}

export {register, login, getAllHotels, addHotel, getCurrentHotel, addReview, getHotelReviews};