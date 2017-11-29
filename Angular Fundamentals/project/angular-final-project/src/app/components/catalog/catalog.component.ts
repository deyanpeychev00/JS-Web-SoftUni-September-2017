import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {getCatalog} from "../../../utils/catalog-utils";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalog;
  permissions: boolean;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.permissions = localStorage.getItem('authtoken') !== null;
    });
  }

  async ngOnInit() {
    this.catalog = await getCatalog();
    this.permissions = localStorage.getItem('authtoken') !== null;
  }
}
