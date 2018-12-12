import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../_services/user.service";
import {AuthenticationService, GeneralService} from "../../_services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    accountForm: FormGroup;
    name: FormControl;
    stellar_address: string;
    stellar_account: string;
    email: string;

    constructor(private service: UserService, private _globalService: GeneralService,
                private _toastr: ToastrService) {
        this.name = new FormControl('', Validators.required);
        this.accountForm = new FormGroup({
            name: this.name
        });
    }

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        let user = this.service.getCurrentUser();
        this._globalService.loading(true);
        this.service.profile().subscribe(result => {
            this._globalService.loading(false);
            this.name.setValue(result.name);
            this.email = result.email;
            this.stellar_address = `${result.email}*unsinkable.io`;
            this.stellar_account = user.account;
        }, error => {
            this._globalService.loading(false);
        });
    }
    updateProfile() {
        let user = {name: this.name.value};
        this._globalService.loading(true);
        this.service.update(user).subscribe(result => {
            this._globalService.loading(false);
            this._toastr.success('User updated successfullly');
            let currentUser = this.service.getCurrentUser();
            currentUser['name'] = this.name.value;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }, error => {
            this._globalService.loading(false);
            this._toastr.error('Something wrong happened!');
        });
    }
}
