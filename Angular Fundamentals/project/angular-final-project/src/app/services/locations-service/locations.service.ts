import {Injectable} from '@angular/core';
import L from 'leaflet';
import {AdminService} from "../admin/admin.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LocationsService {

  constructor(private adminService: AdminService, private http: HttpClient) {
  }

  initMap(mapId) {
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

  getAllLocations(): Observable<any> {
    return this.http.get('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/locations', {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.adminService.getAdminCredentials().username}:${this.adminService.getAdminCredentials().password}`))
        .set('Content-Type', 'application/json')
    });
  }

  loadMainMap() {
    const mymap = this.initMap('mapid');
    this.getAllLocations().subscribe(data => {
      data.map(location => {
        const marker = L.marker([location.lat, location.long]).addTo(mymap).bindPopup(`<b>${location.name}</b>`);
      });
    });
    return true;
  }

  displaySpecificLocations(locationsArray) {
    const mymap = this.initMap('itemDetailsMap');
    this.getAllLocations().subscribe( data => {
      data.map(l => {
        if (locationsArray.indexOf(l._id.toString()) !== -1) {
          const marker = L.marker([l.lat, l.long]).addTo(mymap).bindPopup(`<b>${l.name}</b>`);
        }
      });
    });

  }
}
