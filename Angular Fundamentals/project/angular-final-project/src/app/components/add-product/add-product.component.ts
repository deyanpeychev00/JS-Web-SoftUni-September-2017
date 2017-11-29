import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "../../toastr.service";
import {RouterAuthService} from "../../router-auth.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private routerAuth: RouterAuthService) {
  }

  ngOnInit() {
    if(!this.routerAuth.canAccess()){
      this.router.navigate(['/']);
      this.toastr.errorToast('You don\'t have the right permissions to enter this page.');
    }
  }
}
