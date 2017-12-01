import {Injectable} from '@angular/core';
import {AdminService} from "../admin/admin.service";

@Injectable()
export class CatalogService {

  constructor( private adminService: AdminService) {
  }

  async getCatalog() {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.adminService.getAdminCredentials().username}:${this.adminService.getAdminCredentials().password}`)
      }
    });
    return await res.json();
  }

  async getLocations() {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/locations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
    return await res.json();
  }

  async addProduct(name, description, price, quantity, imageUrl, category, storageLocation) {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      },
      body: JSON.stringify({
        name, description, price, quantity, imageUrl, category, storageLocation
      })
    });
    return await res.json();
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
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products/'+id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
    return await res.json();
  }

  async postUpdateItem(id, obj, authtoken){
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
      body: JSON.stringify(obj)
    });
    return await res.json();
  }

  async getMyOrders(userId, authtoken){
    const res = await fetch(`https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/?query={"orderer":"${userId}"}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
    });
    return await res.json();
  }

  async getAllOrders(authtoken){
    const res = await fetch(`https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
    });
    return await res.json();
  }

  async updateUserOrders(user, updatedOrders, authtoken){
    user.orders = updatedOrders;
    const res = await fetch('https://baas.kinvey.com/user/kid_HJ2sgDXeM/'+user._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
      body: JSON.stringify(user)
    });
    return await res.json();
  }

  async updateOrders(item, userId, productId, authtoken, username){
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

  async removeOrder(id, authtoken){
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Kinvey ' + authtoken
      }
    });
    return await res.json();
  }

  async removeOrderFromUserList(user, authtoken){
    const res = await fetch('https://baas.kinvey.com/user/kid_HJ2sgDXeM/'+user._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + authtoken
      },
      body: JSON.stringify(user)
    });
    return await res.json();
  }

  async getSingleOrder(orderId, authtoken){
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/orders/' + orderId, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + authtoken
      }
    });
    return await res.json();
  }

  async updateOrderStatus(order, authtoken){
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
