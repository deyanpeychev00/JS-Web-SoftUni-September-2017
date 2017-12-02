import {
  Component,
  OnInit
} from '@angular/core';

import { seed } from './../../seed';


@Component({
  selector: 'note-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data;
  selectedArticle: Object;
  gotSelectedArticle: boolean;

  ngOnInit() {
    this.data = seed;
    this.selectedArticle = {};
    this.gotSelectedArticle = false;
  }

  showDetails(targetId) {
    this.selectedArticle = this.data.find(x => x.id === targetId);
    this.gotSelectedArticle = true;
  }

  deleteTargetArticle(targetId) {
    this.data = this.data.filter(el => Number(el.id) !== Number(targetId));
    this.selectedArticle = {};
    this.gotSelectedArticle = false;
  }
}
