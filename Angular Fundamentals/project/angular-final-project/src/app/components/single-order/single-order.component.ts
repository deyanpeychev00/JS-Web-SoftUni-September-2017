import {Component, Input, OnInit} from '@angular/core';
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {ToastrService} from "../../services/toastr-service/toastr.service";
import {AuthService} from "../../services/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {
  @Input() order;
  @Input() canEdit;

  constructor(private catalogService: CatalogService,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  cancelOrder(orderId) {
    this.toastr.toast('Removing order..');
    this.catalogService.removeOrder(orderId, localStorage.getItem('authtoken')).subscribe(RO => {
        this.authService.getCurrentUser(localStorage.getItem('userId'), localStorage.getItem('authtoken')).subscribe(GCU => {
            if (GCU.orders.indexOf(this.order.productOrdered) !== -1) {
              GCU.orders = GCU.orders.splice(GCU.orders.indexOf(this.order.productOrdered), 1);
            }
            this.catalogService.removeOrderFromUserList(GCU, localStorage.getItem('authtoken')).subscribe(ROFUL => {
                this.catalogService.getItemDetails(this.order.productOrdered).subscribe(GID => {
                    GID.quantity = GID.quantity + 1;
                    this.catalogService.postUpdateItem(this.order.productOrdered, GID, localStorage.getItem('authtoken')).subscribe(PUI => {
                        this.toastr.successToast('Order canceled.');
                        this.router.navigate(['/catalog']);
                      },
                      errPUI => {
                        this.toastr.errorToast((errPUI.error.description ? errPUI.error.description : 'Unknown error occured. Please try again'));
                      });
                  },
                  errorGID => {
                    this.toastr.errorToast((errorGID.error.description ? errorGID.error.description : 'Unknown error occured. Please try again'));
                  });
              },
              errorROFUL => {
                this.toastr.errorToast((errorROFUL.error.description ? errorROFUL.error.description : 'Unknown error occured. Please try again'));
              });
          },
          errorGCU => {
            this.toastr.errorToast((errorGCU.error.description ? errorGCU.error.description : 'Unknown error occured. Please try again'));
          });
      },
      errorRO => {
        this.toastr.errorToast((errorRO.error.description ? errorRO.error.description : 'Unknown error occured. Please try again'));
      });
  }

}
