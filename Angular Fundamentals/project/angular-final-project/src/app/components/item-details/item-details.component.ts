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
      const res = await this.catalogService.getItemDetails(this.itemId);
      if (res.error) {
        this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
      } else {
        this.loadedItemDetails = true;
        this.toastr.successToast('Details loaded.');
        this.item = res;
        if (res.quantity > 0) {
          this.locationsService.displaySpecificLocations(res.storageLocation);
        }
      }
    }
  }

  async deleteItem(id) {
    const res = await
    this.catalogService.postDeleteItem(id, localStorage.getItem('authtoken'));
    if (res.error) {
      this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
    } else {
      this.toastr.successToast('Item deleted.');
      this.router.navigate(['/catalog']);
    }
  }

  async orderItem(orderId) {
    let updatedOrders = [];
    this.toastr.toast('Processing your order..');
    const user = await this.authService.getCurrentUser(localStorage.getItem('userId'), localStorage.getItem('authtoken'));
    if (user.error) {
      this.toastr.errorToast((user.description ? user.description : 'Unknown error occured. Please try again'));
      return;
    } else {
      console.log(user);
      updatedOrders = user.orders;
      updatedOrders.push(orderId);

      const res = await this.catalogService.updateUserOrders(user, updatedOrders, localStorage.getItem('authtoken'));
      if (res.error) {
        this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
      } else {
        const prodUpd = await this.catalogService.updateOrders(localStorage.getItem('userId'), orderId, localStorage.getItem('authtoken'));
        if(prodUpd.error){
          this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
        }else{
          this.toastr.successToast('Product ordered successfully. Please check your orders.');
        }
      }
    }
  }
}
