import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CatalogService} from "../../services/catalog-service/catalog.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalog;
  permissions: boolean;
  constructor(private router: Router,
              private catalogService: CatalogService) {
    router.events.subscribe((val) => {
      this.permissions = localStorage.getItem('authtoken') !== null;
    });
  }

  async ngOnInit() {
    this.catalog = (await this.catalogService.getCatalog()).sort((a,b) => a._kmd.lmt <= b._kmd.lmt);
    this.permissions = localStorage.getItem('authtoken') !== null;
  }
}
