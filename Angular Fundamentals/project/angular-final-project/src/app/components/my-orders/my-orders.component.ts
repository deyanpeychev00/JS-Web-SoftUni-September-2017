import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {ToastrService} from "../../services/toastr-service/toastr.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  myOrders;
  isPageLoaded = false;
  constructor(private catalogService: CatalogService,
              private toastr: ToastrService) {
  }

  async ngOnInit() {
    const orders = await this.catalogService.getMyOrders(localStorage.getItem('userId'), localStorage.getItem('authtoken'));
    if (orders.error) {
      this.toastr.errorToast((orders.description ? orders.description : 'Unknown error occured. Please try again'));
    }else{
      this.isPageLoaded = true;
      this.myOrders = orders;
      if(this.myOrders.length > 0){
        this.toastr.successToast('Orders loading complete.');
      }
    }
  }

}
