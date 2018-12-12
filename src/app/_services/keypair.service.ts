import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class KeyPairService {
  constructor(private http: HttpClient) {
  }
  private apiUrl = environment.api_url;
  addKeyPair(withdraw, token) {
    const url = `${this.apiUrl}/account/addkeypair`;
    return this.http.post(url, withdraw, {headers:new HttpHeaders({'Authorization': 'Bearer '+token})}).map((data: any) => {
      return data;
    });
  }
}
