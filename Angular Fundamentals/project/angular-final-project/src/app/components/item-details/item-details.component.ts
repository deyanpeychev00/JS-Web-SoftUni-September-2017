import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastrService} from "../../services/toastr-service/toastr.service";
import {LocationsService} from "../../services/locations-service/locations.service";
import {RouterAuthService} from "../../services/router-auth-service/router-auth.service";

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
              private routerAuth: RouterAuthService) {
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
        if(res.quantity > 0){
          this.locationsService.displaySpecificLocations(res.storageLocation);
        }
      }
    }
  }

  async deleteItem(id) {
    const res = await this.catalogService.postDeleteItem(id, localStorage.getItem('authtoken'));
    if (res.error) {
      this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
    } else {
      this.toastr.successToast('Item deleted.');
      this.router.navigate(['/catalog']);
    }
  }

  async orderItem(id){
    console.log('item ordered');
  }
}
