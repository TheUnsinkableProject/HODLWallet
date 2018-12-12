import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../_models';

@Injectable()
export class UserService {

    private apiUrl = environment.api_url;
    private token: string;

    constructor(private http: HttpClient) {
        let user = localStorage.getItem('currentUser');
        if (user) {
            user = JSON.parse(user);
            this.token = user['id_token'];
        }
    }

    create(user: User) {
        const apiUrl: string = environment.api_url + '/authentication';
        return this.http.post(apiUrl, user);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    profile() {
        const url = `${this.apiUrl}/user/getprofile`;
        return this.http.get(url, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).map((data: any) => {
            return data;
        });
    }

    update(user) {
        const url = `${this.apiUrl}/user/update`;
        return this.http.post(url, user, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).map((data: any) => {
            return data;
        });
    }
}
