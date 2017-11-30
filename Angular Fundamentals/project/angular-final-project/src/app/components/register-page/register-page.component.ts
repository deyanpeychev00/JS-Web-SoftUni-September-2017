import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth-service/auth.service";
import {ToastrService} from "../../services/toastr-service/toastr.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  email: string;
  username: string;
  password: string;
  repeatedPassword: string;

  constructor(private router: Router,
              private toastr: ToastrService,
              private auth: AuthService) {
  }

  ngOnInit() {
  }

  getBack() {
    window.history.back();
  }

  async submitRegister() {
    this.toastr.toast('Registering..');
    const res = await this.auth.register(this.username, this.email, this.password, this.repeatedPassword);
    if(res.error){
      this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
    }else{
      if (res.isAdmin) {
        localStorage.setItem('role', res._kmd._id);
      } else {
        localStorage.setItem('role', 'init');
      }
      this.toastr.successToast('Successful registration.');
      localStorage.setItem('authtoken', res._kmd.authtoken);
      localStorage.setItem('username', res.username);
      localStorage.setItem('userId', res._id);
      this.router.navigate(['/catalog']);
    }
  }
}
