import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {RouterAuthService} from "../../services/router-auth-service/router-auth.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ToastrService} from "../../services/toastr-service/toastr.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-change-order-status',
  templateUrl: './change-order-status.component.html',
  styleUrls: ['./change-order-status.component.css']
})
export class ChangeOrderStatusComponent implements OnInit {
  orderId;
  orderToChange;
  newOrderStatus;

  constructor(private catalogService: CatalogService,
              private routerAuth: RouterAuthService,
              private router: Router,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this.routerAuth.canAccess()) {
      this.router.navigate(['/']);
      this.toastr.errorToast('You don\'t have the right permissions to enter this page.');
    } else {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.orderId = params['id'];
      });
      this.catalogService.getSingleOrder(this.orderId, localStorage.getItem('authtoken')).subscribe(data => {
        this.toastr.successToast('Order details loaded.');
        this.orderToChange = data;
        this.newOrderStatus = this.orderToChange.status;
      },
        err => {
          this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
        });
    }
  }

  updateStatus(){
    this.orderToChange.status = this.newOrderStatus;
    if(this.orderToChange.status === '' || this.orderToChange.status === undefined || this.orderToChange.status === null){
      this.toastr.errorToast('Please enter order status.');
      return;
    }
    if(this.orderToChange.status !== 'Awaiting delivery' && this.orderToChange.status !== 'Delivering' && this.orderToChange.status !== 'Complete'){
      this.toastr.errorToast('Please enter a valid order status.');
      return;
    }
    this.catalogService.updateOrderStatus(this.orderToChange, localStorage.getItem('authtoken')).subscribe(data => {
      this.toastr.successToast('Order status changed successfully.');
      this.router.navigate(['/orders/manage']);
    },
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
      });
  }

}
