import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item;
  @Input() permissions;
  @Input() tags;
  isAdmin;
  constructor() { }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') !== 'init';
  }

}
