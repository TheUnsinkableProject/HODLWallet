import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class OffersService {
    private apiUrl = environment.api_url;

    token: string;

    constructor(private http: HttpClient) {
        let user = localStorage.getItem('currentUser');
        if (user) {
            user = JSON.parse(user);
            this.token = user['id_token'];
        }
    }

    saveOffer(offer) {
        const url = `${this.apiUrl}/account/manage_offer`;
        return this.http.post(url, offer, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).map((data: any) => {
            return data;
        });
    }

    sendbuy(offer) {
        const url = `${this.apiUrl}/hodl/locksell`;
        return this.http.post(url, offer, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).map((data: any) => {
            return data;
        });
    }

    sendsell(offer) {
        const url = `${this.apiUrl}/hodl/locksell`;
        return this.http.post(url, offer, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).map((data: any) => {
            return data;
        });
    }

    

    sells() {
        const url = `${this.apiUrl}/account/offers/sell`;
        return this.http.get(url, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).map((data: any) => {
            return data;
        });
    }

    buys() {
        const url = `${this.apiUrl}/account/offers/buy`;
        return this.http.get(url, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).map((data: any) => {
            return data;
        });
    }

    offers() {
        const url = `${this.apiUrl}/offers`;
        return this.http.get(url, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).map((data: any) => {
            return data;
        });
    }

    cancel(id) {
        let offer = {
            offerid: id
        };
        const url = `${this.apiUrl}/account/offer/cancel`;
        return this.http.post(url, offer, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).map((data: any) => {
            return data;
        });
    }
}

