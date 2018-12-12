import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.id_token}`,
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}
