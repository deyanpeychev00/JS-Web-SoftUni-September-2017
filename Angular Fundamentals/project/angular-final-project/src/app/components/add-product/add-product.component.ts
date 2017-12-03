import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "../../services/toastr-service/toastr.service";
import {RouterAuthService} from "../../services/router-auth-service/router-auth.service";
import {CatalogService} from "../../services/catalog-service/catalog.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  locations;
  storageLocations;
  name: string;
  description: string;
  quantity: number;
  price: number;
  locationsObj = {};
  tags;
  imageUrl: string;

  constructor(private router: Router,
              private toastr: ToastrService,
              private routerAuth: RouterAuthService,
              private catalogService: CatalogService) {
  }

  ngOnInit() {
    if (!this.routerAuth.canAccess()) {
      this.router.navigate(['/']);
      this.toastr.errorToast('You don\'t have the right permissions to enter this page.');
    } else {
      const locationsNames = [];
      this.catalogService.getLocations().subscribe(data => {
        this.locations = data;
        this.locations.map(l => {
          locationsNames.push(l.name);
          this.locationsObj[l.name] = l._id;
        });
        this.storageLocations = locationsNames.join(', ');
      });
    }
  }

  submitAddProduct() {
    if (this.tags === undefined) {
      this.toastr.errorToast('Please specify product categories in the tags field.');
      return;
    }
    if (this.storageLocations === '') {
      this.toastr.errorToast('Please specify product storage locations in the storage locations field.');
      return;
    }
    this.tags = this.tags.split(',').map(t => {
      if (t !== ' ' || t !== '') {
        return t.trim();
      }
    });
    this.storageLocations = this.storageLocations.split(',').map(s => {
      return s.trim();
    });
    const bodyStorages = [];
    for (const lcn of this.storageLocations) {
      if (lcn !== '') {
        bodyStorages.push(this.locationsObj[lcn]);
      }
    }

    this.catalogService.addProduct(this.name, this.description, this.price, this.quantity, this.imageUrl, this.tags, bodyStorages).subscribe(data => {
        this.toastr.successToast('Product added.');
        this.router.navigate(['/catalog']);
      },
      err => {
        this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
      });

  }

  getBack() {
    window.history.back();
  }
}
