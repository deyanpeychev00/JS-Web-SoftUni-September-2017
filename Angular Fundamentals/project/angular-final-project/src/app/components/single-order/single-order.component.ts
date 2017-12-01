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
  constructor(
    private catalogService: CatalogService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async cancelOrder(orderId){
    this.toastr.toast('Removing order..');
    const removedOrder = await this.catalogService.removeOrder(orderId, localStorage.getItem('authtoken'));
    if (removedOrder.error) {
      this.toastr.errorToast((removedOrder.description ? removedOrder.description : 'Unknown error occured. Please try again'));
    }else{
      const user = await this.authService.getCurrentUser(localStorage.getItem('userId'), localStorage.getItem('authtoken'));
      if(user.error){
        this.toastr.errorToast((removedOrder.description ? removedOrder.description : 'Unknown error occured. Please try again'));
      }else{
        if (user.orders.indexOf(this.order.productOrdered) !== -1) {
          user.orders = user.orders.splice(user.orders.indexOf(this.order.productOrdered), 1);
        }
        const removeUserOrders = await this.catalogService.removeOrderFromUserList(user, localStorage.getItem('authtoken'));
        if(removeUserOrders.error){
          this.toastr.errorToast((removeUserOrders.description ? removeUserOrders.description : 'Unknown error occured. Please try again'));
        }else{
          const item = await this.catalogService.getItemDetails(this.order.productOrdered);
          if(item.error){
            this.toastr.errorToast((item.description ? item.description : 'Unknown error occured. Please try again'));
          }else{
            item.quantity = item.quantity+1;
            const updateItem = await this.catalogService.postUpdateItem(this.order.productOrdered, item, localStorage.getItem('authtoken'));
            if(updateItem.error){
              this.toastr.errorToast((updateItem.description ? updateItem.description : 'Unknown error occured. Please try again'));
            }else{
              this.toastr.successToast('Order canceled.');
              this.router.navigate(['/catalog']);
            }
          }
        }
      }
    }
  }

}
