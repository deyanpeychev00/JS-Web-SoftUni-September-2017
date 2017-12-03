import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastrService} from "../../services/toastr-service/toastr.service";
import {LocationsService} from "../../services/locations-service/locations.service";
import {RouterAuthService} from "../../services/router-auth-service/router-auth.service";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  itemId: string;
  item = {
    imageUrl: ''
  };
  isAdmin: boolean;
  loadedItemDetails = false;

  constructor(private catalogService: CatalogService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private locationsService: LocationsService,
              private router: Router,
              private routerAuth: RouterAuthService,
              private authService: AuthService) {
  }

  async ngOnInit() {
    if (!this.routerAuth.canAccessUser()) {
      this.toastr.errorToast('You don\'t have the right permissions to enter this page.');
      this.router.navigate(['/catalog']);
    } else {
      this.isAdmin = localStorage.getItem('role') !== 'init';
      this.activatedRoute.params.subscribe((params: Params) => {
        this.itemId = params['id'];
      });

      this.catalogService.getItemDetails(this.itemId).subscribe(res => {
          this.loadedItemDetails = true;
          this.toastr.successToast('Details loaded.');
          this.item = res;
          if (res.quantity > 0) {
            this.locationsService.displaySpecificLocations(res.storageLocation);
          }
        },
        err => {
          this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
        });
    }
  }

  deleteItem(id) {
    this.catalogService.postDeleteItem(id, localStorage.getItem('authtoken')).subscribe(data => {
        this.toastr.successToast('Item deleted.');
        this.router.navigate(['/catalog']);
      },
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
      });

  }

  async orderItem(orderId) {
    let updatedOrders = [];
    this.toastr.toast('Processing your order..');
    this.authService.getCurrentUser(localStorage.getItem('userId'), localStorage.getItem('authtoken')).subscribe(GCU => {
        updatedOrders = GCU.orders;
        updatedOrders.push(orderId);
        this.catalogService.updateUserOrders(GCU, updatedOrders, localStorage.getItem('authtoken')).subscribe(UUO => {
            this.catalogService.updateOrders(this.item, localStorage.getItem('userId'), orderId, localStorage.getItem('authtoken'), localStorage.getItem('username')).subscribe(UO => {
                this.catalogService.getItemDetails(orderId).subscribe(GID => {
                    GID.quantity = GID.quantity - 1;
                    this.catalogService.postUpdateItem(orderId, GID, localStorage.getItem('authtoken')).subscribe(PUI => {
                        this.toastr.successToast('Product ordered successfully. Please check your orders.');
                      },
                      errorPUI => {
                        this.toastr.errorToast((errorPUI.error.description ? errorPUI.error.description : 'Unknown error occured. Please try again'));
                      });
                  },
                  errorGID => {
                    this.toastr.errorToast((errorGID.error.description ? errorGID.error.description : 'Unknown error occured. Please try again'));
                  });
              },
              errorUO => {
                this.toastr.errorToast((errorUO.error.description ? errorUO.error.description : 'Unknown error occured. Please try again'));
              });
          },
          errorUUO => {
            this.toastr.errorToast((errorUUO.error.description ? errorUUO.error.description : 'Unknown error occured. Please try again'));
          });
      },
      errorGCU => {
        this.toastr.errorToast((errorGCU.error.description ? errorGCU.error.description : 'Unknown error occured. Please try again'));
      });
  }
}
