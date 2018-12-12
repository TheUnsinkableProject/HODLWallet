import {Component, OnInit} from '@angular/core';
import {KeyPairService} from '../../_services/keypair.service';
import {GeneralService} from '../../_services';
import {ToastrService} from '../../../../node_modules/ngx-toastr';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-keypair',
    templateUrl: './keypair.component.html',
    styleUrls: ['./keypair.component.css']
})
export class KeypairComponent implements OnInit {


    keyForm: FormGroup;
    private_key: FormControl;
    password: FormControl;
    public_key: string = ''
    user: string = '';
    msgs = [];
    errorMsgs = [];

    constructor(private service: KeyPairService, private _globalService: GeneralService, private _toastr: ToastrService) {
    }

    ngOnInit() {
        this.user = localStorage.getItem('currentUser');
        this.user = JSON.parse(this.user);
        this.createFormControl();
        this.createFormGroup();
    }

    addKeyPair() {
        let keypair = {
            private_key: this.private_key.value,
            password: this.password.value,
        };

        if (this.keyForm.valid) {
            this._globalService.loading(true);
            this.service.addKeyPair(keypair, this.user['id_token']).subscribe((response) => {
                this._globalService.loading(false);
                this._toastr.success(response.message);
                this.public_key = response.public_key;
                this.keyForm.reset();
            }, error => {
                this._globalService.loading(false);
                const errorData = error.error;
                if (errorData) {
                    if (errorData.message) {
                        this._toastr.error(errorData.message);
                    }
                    if (errorData.errors) {
                        this.msgs = Object.values(errorData.errors);
                        for (const msg of this.msgs) {
                            this._toastr.error(msg);
                        }
                    }
                }
            });
        }
    }

    createFormControl() {
        this.private_key = new FormControl('', Validators.required);
        this.password = new FormControl('', Validators.required);
    }

    createFormGroup() {
        this.keyForm = new FormGroup({
            private_key: this.private_key,
            password: this.password
        });
    }


}
