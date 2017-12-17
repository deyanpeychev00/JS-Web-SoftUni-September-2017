import { Component, OnInit } from '@angular/core';
import {LocationsService} from "../../services/locations-service/locations.service";
import {ToastrService} from "../../services/toastr-service/toastr.service";

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {
  constructor(private locationsService: LocationsService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.toastr.toast('Loading locations..');
    this.locationsService.loadMainMap();
  }
}
