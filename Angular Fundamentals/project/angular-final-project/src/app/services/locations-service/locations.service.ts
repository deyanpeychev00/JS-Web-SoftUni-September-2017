import {Injectable} from '@angular/core';
import L from 'leaflet';
import {AdminService} from "../admin/admin.service";

@Injectable()
export class LocationsService {

  constructor(private adminService: AdminService) {
  }

  initMap(mapId){
    const BG = [42.7249925, 25.4833039];
    const zoomLevel = 7;
    const API = 'pk.eyJ1IjoiZGV5YW5wcGV5Y2hldiIsImEiOiJjajk0OHp1OHM0MTVsMnFtYnpvMmN2OHZjIn0.56yRPY_ti-lHyhTETtaXKg';

    const mymap = L.map(mapId).setView(BG, zoomLevel);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + API, {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    return mymap;
  }
  async getAllLocations() {
    const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/locations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.adminService.getAdminCredentials().username}:${this.adminService.getAdminCredentials().password}`)
      }
    });

    return await res.json();
  }

  async loadMainMap() {
    const mymap = this.initMap('mapid');
    const json = await this.getAllLocations();
    json.map(location => {
      const marker = L.marker([location.lat, location.long]).addTo(mymap).bindPopup(`<b>${location.name}</b>`);
    });
  }
  async displaySpecificLocations(locationsArray){
    const mymap  = this.initMap('itemDetailsMap');
    const json = await this.getAllLocations();
    json.map(l => {
      if(locationsArray.indexOf(l._id.toString()) !== -1){
        const marker = L.marker([l.lat, l.long]).addTo(mymap).bindPopup(`<b>${l.name}</b>`);
      }
    });
  }
}
