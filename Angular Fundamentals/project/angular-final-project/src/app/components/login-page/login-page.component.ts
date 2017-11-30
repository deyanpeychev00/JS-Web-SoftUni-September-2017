import {Component, OnInit} from '@angular/core';

import {AuthService} from "../../services/auth-service/auth.service";
import { Router } from '@angular/router';
import {ToastrService} from "../../services/toastr-service/toastr.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService) {
  }

  ngOnInit() {

  }

  getBack() {
    window.history.back();
  }

  async submitLogin() {
    this.toastr.toast('Logging in..');
    const res = await this.auth.login(this.username, this.password);
    if(res.error){
      this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
    }else{
      if(res.isAdmin){
        localStorage.setItem('role', res._id);
      }else{
        localStorage.setItem('role', 'init');
      }
      this.toastr.successToast('Successful login.');
      localStorage.setItem('authtoken', res._kmd.authtoken);
      localStorage.setItem('username', res.username);
      localStorage.setItem('userId', res._id);
      this.router.navigate(['/catalog']);
    }
  }
}
