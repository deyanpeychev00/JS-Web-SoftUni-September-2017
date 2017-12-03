import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {ToastrService} from "../../services/toastr-service/toastr.service";
import {Router} from "@angular/router";
import {RouterAuthService} from "../../services/router-auth-service/router-auth.service";

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  myOrders;
  isPageLoaded = false;

  constructor(private catalogService: CatalogService,
              private toastr: ToastrService,
              private router: Router,
              private routerAuth: RouterAuthService) {
  }

  ngOnInit() {
    if (!this.routerAuth.canAccess()) {
      this.router.navigate(['/']);
      this.toastr.errorToast('You don\'t have the right permissions to enter this page.');
    } else {
      this.catalogService.getAllOrders(localStorage.getItem('authtoken')).subscribe(data => {
          this.isPageLoaded = true;
          this.myOrders = data;
          if (this.myOrders.length > 0) {
            this.toastr.successToast('Orders loading complete.');
          }
      },
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
      });
    }
  }

}
