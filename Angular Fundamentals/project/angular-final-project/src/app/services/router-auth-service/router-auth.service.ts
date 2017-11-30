import { Injectable } from '@angular/core';
const role = 'init';

@Injectable()
export class RouterAuthService {

  constructor() {}
  canAccess(){
    return localStorage.getItem('role') !== role;
  }
}
