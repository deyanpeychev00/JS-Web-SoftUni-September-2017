import { Component, OnInit } from '@angular/core';
import loadMap from './loadMap';


@Component({
  selector: 'app-sample-map',
  templateUrl: './sample-map.component.html',
  styleUrls: ['./sample-map.component.css']
})
export class SampleMapComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    loadMap();
  }

}
