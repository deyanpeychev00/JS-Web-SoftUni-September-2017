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
    this.catalogService.getMyOrders(localStorage.getItem('userId'), localStorage.getItem('authtoken')).subscribe(data => {
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
