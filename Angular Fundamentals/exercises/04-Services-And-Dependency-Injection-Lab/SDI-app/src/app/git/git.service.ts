import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GitService {
  constructor(private httpClient: HttpClient) {
  }

  getProfileInfo(): Observable<Object> {
    const API_URL = 'https://api.github.com/users/nakov';
    return this.httpClient.get(API_URL);
  }
}
