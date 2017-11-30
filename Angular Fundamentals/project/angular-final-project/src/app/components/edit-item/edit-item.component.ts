import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastrService} from "../../services/toastr-service/toastr.service";
import {LocationsService} from "../../services/locations-service/locations.service";
import {RouterAuthService} from "../../services/router-auth-service/router-auth.service";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  locations;
  locationsObj = {};
  itemId: string;
  item = {
    imageUrl: ''
  };
  isAdmin: boolean;
  availableLocations;
  isPageLoaded = false;

  // declare item properties
  name: string;
  description: string;
  quantity: number;
  price: number;
  tags;
  imageUrl: string;

  constructor(private catalogService: CatalogService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
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
        this.locations = await this.catalogService.getLocations();
        let locationsNames = [];

        this.locations.map(l => {
          if (res.storageLocation.indexOf(l._id) !== -1) {
            locationsNames.push(l.name);
            this.locationsObj[l.name] = l._id;
          }
        });
        this.availableLocations = locationsNames.join(', ');
        this.item = res;
        this.isPageLoaded = true;
        this.name = res.name;
        this.description = res.description;
        this.quantity = res.quantity;
        this.price = res.price;
        this.tags = res.category;
        this.imageUrl = res.imageUrl;
        this.toastr.successToast('Item details loaded.');
        console.log(this);
      }
    }
  }

  async updateProduct(productId) {
    if (typeof this.tags === 'string') {
      this.tags = this.tags.split(',').map(t => {
        return t.trim();
      });
    }
    if(typeof this.availableLocations === 'string'){
      this.availableLocations = this.availableLocations.split(',').map(al => {
        return al.trim();
      });
    }
    for (const lcp in this.locations) {
        if(this.availableLocations.indexOf(this.locations[lcp]['name']) !== -1){
          this.availableLocations[this.availableLocations.indexOf(this.locations[lcp]['name'])] = this.locations[lcp]['_id'];
        }
    }
    if(this.name === '' || this.description === '' || this.price === null || this.quantity === null || this.imageUrl==='' || this.tags[0] === ''){
      this.toastr.errorToast('Please fill the form fields.');
      return;
    }
    if((this.quantity !== null || this.quantity > 0) && this.availableLocations[0] === ''){
      this.toastr.errorToast('Quantity is over 0 but there are no storage locations. Please add some.');
      return;
    }
    const editedObj = {name: this.name, description: this.description, quantity: Number(this.quantity), price: Number(this.price), imageUrl: this.imageUrl, category: this.tags, storageLocation: this.availableLocations};
    const res = await this.catalogService.postUpdateItem(productId, editedObj, localStorage.getItem('authtoken'));
    if (res.error) {
      this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
    } else {
      this.toastr.successToast('Item successfully updated.');
      this.router.navigate(['items/details/' + productId]);
    }

  }

  getBack() {
    window.history.back();
  }

}
