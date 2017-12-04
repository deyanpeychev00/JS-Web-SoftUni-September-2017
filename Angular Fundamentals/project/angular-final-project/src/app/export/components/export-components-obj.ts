import {AppComponent} from '../.././app.component';
import {MainMapComponent} from '../.././components/main-map/main-map.component';
import {RegisterPageComponent} from '../.././components/register-page/register-page.component';
import {LoginPageComponent} from '../.././components/login-page/login-page.component';
import {CatalogComponent} from '../.././components/catalog/catalog.component';
import {ItemComponent} from '../.././components/item/item.component';
import {AddProductComponent} from '../.././components/add-product/add-product.component';
import {ItemDetailsComponent} from '../.././components/item-details/item-details.component';
import {EditItemComponent} from '../.././components/edit-item/edit-item.component';
import {MyOrdersComponent} from '../.././components/my-orders/my-orders.component';
import {SingleOrderComponent} from '../.././components/single-order/single-order.component';
import {ManageOrdersComponent} from '../.././components/manage-orders/manage-orders.component';
import {ChangeOrderStatusComponent} from '../.././components/change-order-status/change-order-status.component';
import {NotFoundComponent} from "../../components/404/404.component";

export const ComponentsObj = {
  App: AppComponent,
  MainMap: MainMapComponent,
  RegisterPage: RegisterPageComponent,
  LoginPage: LoginPageComponent,
  Catalog: CatalogComponent,
  Item: ItemComponent,
  AddProduct: AddProductComponent,
  ItemDetails: ItemDetailsComponent,
  EditItem: EditItemComponent,
  MyOrders: MyOrdersComponent,
  SingleOrder: SingleOrderComponent,
  ManageOrders: ManageOrdersComponent,
  ChangeOrderStatus: ChangeOrderStatusComponent,
  NotFound: NotFoundComponent
};
