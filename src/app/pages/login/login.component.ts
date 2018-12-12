import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, AlertService, GeneralService} from '../../_services';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    branches: any = [];
    loading = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private _toastr: ToastrService,
                private generalservice: GeneralService) {
    }

    ngOnInit() {
        this.authenticationService.logout();
    }


    login() {
        this.generalservice.loading(true);
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    console.log(data);
                    this.generalservice.loading(false);
                    this._toastr.success('Login successful');
                    setTimeout(() => {
                        this.router.navigate(['/dashboard']);
                    }, 1500);
                },
                error => {
                    this.generalservice.loading(false);

                    this._toastr.error(error.error.message);
                    this.loading = false;
                });
    }
}
