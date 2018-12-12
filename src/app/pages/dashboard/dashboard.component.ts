import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {GeneralService, AuthenticationService} from '../../_services';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SuperComponent} from '../../_components/SuperComponent';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends SuperComponent implements OnInit {

    balance;
    account_id: string = '';
    user: any = {};

    constructor(public service: UserService,
                public _globalService: GeneralService,
                private authenticationService: AuthenticationService,
                private _router: Router,
                private _toastr: ToastrService,
                __cdr: ChangeDetectorRef) {

        super(_globalService, _router, _toastr, __cdr);
        this.user = service.getCurrentUser();

    }

    ngOnInit() {

        let user = localStorage.getItem('currentUser');
        user = JSON.parse(user);
        if (user)
            this.account_id = user["account"];
        this.account_id = user['account'];
        this._globalService.get('/account/getbalance').subscribe(balance => {
            this.balance = balance;
        });

    }

    goToPay() {
        this._router.navigate(['/payoff']);
    }


}
