import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Withdraw } from '../_models/withdraw';
import { environment } from '../../environments/environment';

const httpOptions = {
  // headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class HistoryService {
  constructor(private http: HttpClient) {
  }

  // private instance variable to hold base url
  private apiUrl = environment.api_url;

  all(): Observable<any> {
    return this.http.get(this.apiUrl + '/account/transactions').map((data: any) => {
      return data;
    });
  }

  saveWithdraw(withdraw, token) {
    const url = `${this.apiUrl}/account/send`;
    return this.http.post(url, withdraw, {headers:new HttpHeaders({'Authorization': 'Bearer '+token})}).map((data: any) => {
      return data;
    });
  }
}
