import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {
  emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private http: HttpClient) {
  }

  validateRegisterForm(username, email, password, repeatedPassword) {
    if (username === '' || username === null || username === undefined || username.length < 4) {
      return {
        success: false,
        error: 'Username should be at least 4 characters long.'
      };
    }
    if (!this.emailRegex.test(email) || email === '' || email === null || email === undefined) {
      return {
        success: false,
        error: 'Invalid email.'
      };
    }
    if (password === '' || password === null || password === undefined || password.length < 4) {
      return {
        success: false,
        error: 'Password should be at least 4 characters long.'
      };
    }
    if (password !== repeatedPassword){
      return {
        success: false,
        error: 'Password do not match.'
      };
    }

    return {
      success: true,
      error: ''
    };
  }

  register(username, email, password): Observable<any> {
    const body = JSON.stringify({name: username, username, email, password, isAdmin: false, orders: []});
    return this.http.post('https://baas.kinvey.com/user/kid_HJ2sgDXeM/', body, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`kid_HJ2sgDXeM:e3d5708e5a4e426faf65a4ec436e8507`))
        .set('Content-Type', 'application/json')
    });
  }

  login(username, password): Observable<any> {
    const body = JSON.stringify({username, password});
    return this.http.post('https://baas.kinvey.com/user/kid_HJ2sgDXeM/login', body, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`kid_HJ2sgDXeM:e3d5708e5a4e426faf65a4ec436e8507`))
        .set('Content-Type', 'application/json')
    });
  }

  async getCurrentUser(userId, authtoken) {
    const res = await fetch('https://baas.kinvey.com/user/kid_HJ2sgDXeM/' + userId, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + authtoken,
        'Content-Type': 'application/json'
      },
    });
    return await res.json();
  }
}
