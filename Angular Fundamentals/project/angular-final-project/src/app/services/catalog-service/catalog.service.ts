import {Injectable} from '@angular/core';

@Injectable()
export class CatalogService {

  constructor() {
  }

  async getCatalog() {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Kinvey 0ceb0005-c7c7-43cc-bb58-ca65ed1f737a.c/Nmndb374P52RaI8cD3oGFmtz6RKY0mbmubhqa0uV0='
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
}
