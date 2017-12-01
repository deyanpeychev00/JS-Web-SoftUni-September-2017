import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  constructor() { }

  getAdminCredentials(){
    return {
      username: 'Admin',
      password: 'admin'
    };
  }
}
