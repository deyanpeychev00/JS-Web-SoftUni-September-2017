import { Component, OnInit } from '@angular/core';
import {LocationsService} from "../../services/locations-service/locations.service";

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {
  mapLoaded = false;
  constructor(private locationsService: LocationsService) { }

  async ngOnInit() {
    await this.locationsService.loadMainMap();
    this.mapLoaded = true;
  }
}
