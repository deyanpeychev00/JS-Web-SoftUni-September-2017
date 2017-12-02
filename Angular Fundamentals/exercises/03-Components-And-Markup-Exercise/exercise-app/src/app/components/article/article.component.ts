import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'note-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnChanges {

  @Input() article;
  @Output() deleteArticleEmitter: EventEmitter<any> = new EventEmitter();

  counter = 1;
  limit = 0;
  hideAll = false;
  hidePartial = false;
  displayImage = false;
  constructor() { }

  ngOnChanges() {
    this.counter = 1;
    this.limit = 0;
    this.hideAll = false;
    this.hidePartial = false;
    this.displayImage = false;
  }
  trunc(string) {
    if (string) {
      return string.slice(0, (this.counter - 1) * 250);
    }
  }
  readMore() {
    this.limit = Math.ceil(this.article.text.length / 250);
    if (this.limit === this.counter) {
      this.hideAll = true;
      this.hidePartial = false;
    }else {
      this.hidePartial = true;
    }
    this.counter = this.counter + 1;
  }
  hideText() {
    this.hideAll = false;
    this.hidePartial = false;
    this.counter = 1;
  }

  hideImage() {
    this.displayImage = false;
  }

  showImage() {
    this.displayImage = true;
  }

  deleteArticle(targetId: number): void {
    this.deleteArticleEmitter.emit(targetId);
  }
}
