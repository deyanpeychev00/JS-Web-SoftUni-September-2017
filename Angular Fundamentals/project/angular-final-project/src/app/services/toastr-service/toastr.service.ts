import { Injectable } from '@angular/core';
declare const Materialize: any;

@Injectable()
export class ToastrService {

  constructor() { }
  toast(text: string, cb?) {
    Materialize.toast(text, 1500, '', cb);
  }

  warningToast(text: string, cb?) {
    Materialize.toast(text, 1500, 'orange darken-1', cb);
  }

  successToast(text: string, cb?) {
    Materialize.toast(text, 1500, 'green lighten-1', cb);
  }

  errorToast(text: string, cb?) {
    Materialize.toast(text, 1500, 'red lighten-1', cb);
  }
}
