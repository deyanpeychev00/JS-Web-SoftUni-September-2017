import { Component, OnInit } from '@angular/core';
import {loadMainMap} from '../../../utils/map-utilities';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {
  mapLoaded: boolean = false;
  constructor() { }

  ngOnInit() {
    loadMainMap();
    this.mapLoaded = true;
  }

}
