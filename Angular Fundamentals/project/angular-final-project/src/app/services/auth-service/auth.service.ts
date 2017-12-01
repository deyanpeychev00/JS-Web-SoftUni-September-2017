import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {
  }

  async register(username, email, password, repeatPassword) {
    const res = await fetch('https://baas.kinvey.com/user/kid_HJ2sgDXeM/', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`kid_HJ2sgDXeM:e3d5708e5a4e426faf65a4ec436e8507`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        username,
        email,
        password,
        isAdmin: false,
        orders: []
      })
    });
    return await res.json();
  }

  async login(username, password) {
    const res = await fetch('https://baas.kinvey.com/user/kid_HJ2sgDXeM/login', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`kid_HJ2sgDXeM:e3d5708e5a4e426faf65a4ec436e8507`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    return await res.json();
  }

  async getCurrentUser(userId, authtoken){
    const res = await fetch('https://baas.kinvey.com/user/kid_HJ2sgDXeM/'+userId, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + authtoken,
        'Content-Type': 'application/json'
      },
    });
    return await res.json();
  }
}
