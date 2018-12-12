import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {General, PaginatedTable} from '../_models';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class GeneralService {
  public isLoading = false;
  pageTitle = new BehaviorSubject(null);
  @BlockUI() blockUI: NgBlockUI;
  currentUser;
  settings;
  currentRequest;

  constructor(private http: HttpClient) {
    this.reloadGlobal();
  }

  reloadGlobal() {
  }

  isAdmin() {
    return false;
  }

  get(load): Observable<any> {
    // remove user from local storage to log user out
    const apiUrl: string = environment.api_url + load;
    return this.http.get(apiUrl);
  }




  delete(url): Observable<any> {
    return this.http.delete(environment.api_url + '/' + url);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    this.isLoading = false;
    return Promise.reject(error.message || error);
  }

  setPageTitle(title: string) {
    this.pageTitle.next(title);
  }

  loading(type: boolean) {
    console.log(type);
    if (type)  {
      this.blockUI.start();
    }  else {
      this.blockUI.stop();
    }
  }

  getRequest(route): Observable<any> {
    return this.http.get(environment.api_url + '/' + route);
  }


  saveForm(model: any, route: string, id?: number): Observable<any> {
    if (id == null || id === undefined) {
      return this.http.post(`${environment.api_url}/${route}`, model);
    }  else {
      return this.http.put(`${environment.api_url}/${route}/${id}`, model);
    }
  }


  pay(model: any, route: string): Observable<any> {
    return this.http.post(`${environment.api_url}/${route}`, model);
  }

}
