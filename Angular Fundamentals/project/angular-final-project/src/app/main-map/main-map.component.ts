import { Component, OnInit } from '@angular/core';
import loadMap from './load-main-map';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    loadMap();
  }

}
