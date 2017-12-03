import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {ToastrService} from "../../services/toastr-service/toastr.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalog;
  permissions: boolean;
  constructor(private router: Router,
              private catalogService: CatalogService,
              private toastr: ToastrService) {
    router.events.subscribe((val) => {
      this.permissions = localStorage.getItem('authtoken') !== null;
    });
  }

  ngOnInit() {
    this.catalogService.getCatalog().subscribe(data => {
        this.catalog = data.sort((a,b) => a._kmd.lmt <= b._kmd.lmt);
        this.permissions = localStorage.getItem('authtoken') !== null;
    },
      err => {
        this.catalog = [];
        this.toastr.errorToast((err.error.description ? err.error.description : 'Unknown error occured. Please try again'));
      });
  }
}
