import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {GeneralService, AuthenticationService} from '../../_services';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SuperComponent} from '../../_components/SuperComponent';


@Component({
    selector: 'app-payoff',
    templateUrl: './payoff.component.html',
    styleUrls: ['./payoff.component.css']
})
export class PayOffComponent extends SuperComponent implements OnInit {

    balance;
    user: any = {};
    status: boolean = false;
    password: string = null;
    key: any;

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


        this._globalService.get('/account/getbalance').subscribe(balance => {
            console.log(balance);

            this.balance = balance;
        });

    }

    pay() {

        this._globalService.loading(true);
        this._globalService.pay({"password": this.password}, 'account/getsecretkey').subscribe(success => {
            this._globalService.loading(false);
            this.status = true;
            this.key = success.private_key;
            delete this.user['refund_xlm'];
            localStorage.setItem("currentUser", JSON.stringify(this.user));
        }, error => {
            this._globalService.loading(false);
            this._toastr.error(error.error.message);
        });
    }


}
