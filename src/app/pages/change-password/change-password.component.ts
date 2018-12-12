import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, AlertService, GeneralService} from '../../_services';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SuperComponent} from '../../_components/SuperComponent';
import {User} from '../../_models';
import {CustomValidators} from "ngx-custom-validators";


@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    myForm: FormGroup;
    old_password: FormControl;
    password: FormControl;
    password_confirmation: FormControl;
    user: string = '';
    msgs = [];
    errorMsgs = [];

    constructor(private _router: Router,
                private _toastr: ToastrService,
                private _globalService: GeneralService) {
    }

    ngOnInit() {
        this.createFormControl();
        this.createFormGroup();
    }

    save() {
        if (this.myForm.valid) {
            let account = {
                old_password: this.old_password.value,
                password: this.password.value,
                password_confirmation: this.password_confirmation.value,
            };
            this._globalService.loading(true);
            if (this.myForm.valid) {
                this._globalService.loading(false);
            }
        }
    }

    createFormControl() {
        this.old_password = new FormControl('', Validators.required);
        this.password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
        this.password_confirmation = new FormControl('', Validators.compose([CustomValidators.equalTo(this.password)]));
    }

    createFormGroup() {
        this.myForm = new FormGroup({
            old_password: this.old_password,
            password: this.password,
            password_confirmation: this.password_confirmation
        });
    }

}
