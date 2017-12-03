import {Injectable} from '@angular/core';
import {AdminService} from "../admin/admin.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CatalogService {

  constructor(private adminService: AdminService, private http: HttpClient) {
  }

  getCatalog(): Observable<any> {
    return this.http.get('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products', {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.adminService.getAdminCredentials().username}:${this.adminService.getAdminCredentials().password}`))
        .set('Content-Type', 'application/json')
    });
  }

  getLocations(): Observable<any> {
    return this.http.get('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/locations', {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    });
  }

  addProduct(name, description, price, quantity, imageUrl, category, storageLocation): Observable<any> {
    const body = JSON.stringify({name, description, price, quantity, imageUrl, category, storageLocation});
    return this.http.post('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products', body, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    });
  }

  postDeleteItem(id, authtoken): Observable<any> {
    return this.http.delete(`https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
    });
  }

  getItemDetails(id): Observable<any> {
    return this.http.get('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    });
  }

  postUpdateItem(id, obj, authtoken): Observable<any> {
    return this.http.put('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products/' + id, JSON.stringify(obj), {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        .set('Content-Type', 'application/json')
    });
  }

  getMyOrders(userId, authtoken): Observable<any> {
    return this.http.get(`https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/?query={"orderer":"${userId}"}`, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        .set('Content-Type', 'application/json')
    });
  }

  getAllOrders(authtoken): Observable<any> {
    return this.http.get(`https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders`, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        .set('Content-Type', 'application/json')
    });
  }

  updateUserOrders(user, updatedOrders, authtoken): Observable<any> {
    user.orders = updatedOrders;
    return this.http.put('https://baas.kinvey.com/user/kid_HJ2sgDXeM/' + user._id, JSON.stringify(user), {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        .set('Content-Type', 'application/json')
    });
  }

  updateOrders(item, userId, productId, authtoken, username): Observable<any> {
    const body = JSON.stringify({
      status: 'Awaiting delivery',
      dateOrdered: (new Date()).toString().substr(0, 15),
      productOrdered: productId,
      orderer: userId,
      itemDetails: {
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl
      },
      ordererUsername: username
    });
    return this.http.post('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders', body, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        .set('Content-Type', 'application/json')
    });
  }

  removeOrder(id, authtoken): Observable<any> {
    return this.http.delete('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
    });
  }

  removeOrderFromUserList(user, authtoken): Observable<any> {
    return this.http.put('https://baas.kinvey.com/user/kid_HJ2sgDXeM/' + user._id,JSON.stringify(user),{
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        .set('Content-Type', 'application/json')
    });
  }

  getSingleOrder(orderId, authtoken) : Observable<any>{
    return this.http.get('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/' + orderId, {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        .set('Content-Type', 'application/json')
    });
  }

  updateOrderStatus(order, authtoken): Observable<any> {
    return this.http.put('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/' + order._id, JSON.stringify(order), {
      headers: new HttpHeaders().set('Authorization', 'Kinvey ' + authtoken)
        .set('Content-Type', 'application/json')
    });
  }
}
