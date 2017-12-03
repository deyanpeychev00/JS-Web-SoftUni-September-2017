import {Injectable} from '@angular/core';
import {AdminService} from "../admin/admin.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CatalogService {

  constructor(private adminService: AdminService, private http: HttpClient) {
  }

  getCatalog():Observable<any> {
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

  async postDeleteItem(id, authtoken) {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Kinvey ' + authtoken
      }
    });
    return await res.json();
  }

  async getItemDetails(id) {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
    return await res.json();
  }

  async postUpdateItem(id, obj, authtoken) {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
      body: JSON.stringify(obj)
    });
    return await res.json();
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

  async updateUserOrders(user, updatedOrders, authtoken) {
    user.orders = updatedOrders;
    const res = await fetch('https://baas.kinvey.com/user/kid_HJ2sgDXeM/' + user._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
      body: JSON.stringify(user)
    });
    return await res.json();
  }

  async updateOrders(item, userId, productId, authtoken, username) {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
      body: JSON.stringify({
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
      })
    });
    return await res.json();
  }

  async removeOrder(id, authtoken) {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Kinvey ' + authtoken
      }
    });
    return await res.json();
  }

  async removeOrderFromUserList(user, authtoken) {
    const res = await fetch('https://baas.kinvey.com/user/kid_HJ2sgDXeM/' + user._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
      body: JSON.stringify(user)
    });
    return await res.json();
  }

  async getSingleOrder(orderId, authtoken) {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/' + orderId, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + authtoken
      }
    });
    return await res.json();
  }

  async updateOrderStatus(order, authtoken) {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/' + order._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
      body: JSON.stringify(order)
    });
    return await res.json();
  }
}
