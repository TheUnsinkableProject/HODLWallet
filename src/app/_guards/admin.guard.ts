import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {GeneralService} from '../_services';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private _general: GeneralService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this._general.isAdmin()) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}
