import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "../../services/toastr-service/toastr.service";
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item;
  @Input() permissions;
  @Input() tags;
  @Input() catalog;
  isAdmin;

  constructor(private toastr: ToastrService,
              private catalogService: CatalogService,
              private router: Router) {
  }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') !== 'init';
  }
}
