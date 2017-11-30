import { Component, OnInit } from '@angular/core';
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

  async ngOnInit() {
    if(!this.routerAuth.canAccess()){
      this.router.navigate(['/']);
      this.toastr.errorToast('You don\'t have the right permissions to enter this page.');
    }else{
      this.locations = await this.catalogService.getLocations();
      let locationsNames = [];

      this.locations.map(l => {
        locationsNames.push(l.name);
        this.locationsObj[l.name] = l._id;
      });
      this.storageLocations = locationsNames.join(', ');
    }
  }

  async submitAddProduct(){
    if(this.tags === undefined){
      this.toastr.errorToast('Please specify product categories in the tags field.');
      return;
    }
    if(this.storageLocations === ''){
      this.toastr.errorToast('Please specify product storage locations in the storage locations field.');
      return;
    }

    this.tags = this.tags.split(',').map(t=>{
      return t.trim();
    });
    this.storageLocations = this.storageLocations.split(',').map(s=>{
      return s.trim();
    });
    const bodyStorages = [];
    for (const location of this.storageLocations) {
      if(location !== ''){
        bodyStorages.push(this.locationsObj[location]);
      }
    }

    const res = await this.catalogService.addProduct(this.name, this.description, this.price, this.quantity, this.imageUrl, this.tags, bodyStorages);
    if(res.error){
      this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
    }else{
      this.toastr.successToast('Product added.');
    }
  }

  getBack() {
    window.history.back();
  }
}
