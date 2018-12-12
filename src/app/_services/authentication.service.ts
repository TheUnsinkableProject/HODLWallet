import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {environment} from '../../environments/environment';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) {
    }

    login(Email: string, Password: string) {
        const apiUrl: string = environment.api_url + '/authentication';
        return this.http.post<any>(apiUrl, {email: Email, password: Password}).pipe(
            map(data => {
                const user = data;
                if (user && user.id_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            })
        );
    }


    forget(Email: string) {
        const apiUrl: string = environment.api_url + '/forget-password';
        return this.http.post<any>(apiUrl, {email: Email}).pipe(
            map(data => {
                return data;
            })
        );
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 100);
    }
}
