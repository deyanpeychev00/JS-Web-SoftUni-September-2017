import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from "./services/toastr-service/toastr.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logged = localStorage.getItem('authtoken') !== null;
  admin = localStorage.getItem('role') !== 'init';
  username = localStorage.getItem('username');

  constructor(private router: Router, private toastr: ToastrService) {
    router.events.subscribe((val) => {
      this.logged = localStorage.getItem('authtoken') !== null;
      this.admin = localStorage.getItem('role') !== 'init';
      this.username = localStorage.getItem('username');
    });
  }

  ngOnInit() {
  }

  logOut() {
    this.logged = false;
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
