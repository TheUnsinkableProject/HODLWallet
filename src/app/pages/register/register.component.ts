import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, AlertService, GeneralService} from '../../_services';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl} from '@angular/forms';
import {SuperComponent} from '../../_components/SuperComponent';
import {User} from '../../_models';
import swal from 'src/assets/vendor/sweetalert/sweetalert.min.js';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent extends SuperComponent implements OnInit {
    agreed = new FormControl(false);

    constructor(private fb: FormBuilder,
                private _router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService,
                private _toastr: ToastrService,
                private _globalService: GeneralService,
                __cdr: ChangeDetectorRef) {
        super(_globalService, _router, _toastr, __cdr);
        this.model = new User(null);
    }

    ngOnInit() {
        this.myForm = User.buildForm(this.fb);
    }

    save() {
        if (this.myForm.valid) {
            this._globalService.loading(true);
            const formValues = this.myForm.value;
            // this.model.items = formValues.items;
            // this.model.branch_id = this._globalService.currentUser.session_branch.id;
            // this.model.id = this._globalService.currentRequest ? this._globalService.currentRequest.id : null;
            const id = this.model.id;
            this._globalService.saveForm(this.model, 'signup', id).subscribe(response => {
               
                this._globalService.loading(false);
                //this._toastr.success('Registered successfully');
                this._toastr.success('Congratulations on making a Stellar account!');
                localStorage.setItem('currentRequest', JSON.stringify(response.request));
               
                setTimeout(() => {
                   
                   this._router.navigate([`users`]);
                });
                this.myForm.reset();
                
            }, error => {
                const errorData = error.error;
                this._globalService.loading(false);
                if (errorData.message) {
                    this._toastr.error(errorData.message);
                }
                if (errorData.errors) {
                    this.msges = Object.values(errorData.errors);
                    for (const msg of this.msges) {
                        this._toastr.error(msg);
                    }
                }
            });
        } else {
            this.validateAllFormFields(this.myForm);
            if (this.myForm.controls.items) {
                this.myForm.controls.items['controls'].forEach((item) => {
                    this.validateAllFormFields(item);
                });
            }
        }
    }

    isValid() {
        if (this.myForm != null) {
            return User.isValid(this.myForm);
        } else {
            return false;
        }
    }

    openAlert(){
        event.preventDefault();
        swal("This wallet is under ongoing development and is still in early beta testing. Use is at your own risk. Do not put substantial funds into the HODL Wallet beta");
    }
}
