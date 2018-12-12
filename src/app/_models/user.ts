import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {SuperClass} from './SuperClass';
import {CustomValidators} from 'ngx-custom-validators';


export class User extends SuperClass {
    name: string;
    email: string;
    password: number;
    password_confirmation: number;

    constructor(name?: string,
                email?: string,
                password?: number,
                password_confirmation?: number,) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }

    public static buildForm(fb: FormBuilder): FormGroup {
        const password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
        const password_confirmation = new FormControl('', Validators.compose([CustomValidators.equalTo(password)]));
        const agreed = new FormControl('', Validators.compose([Validators.required]));
        return fb.group({
            name: [null, Validators.compose([Validators.required])],
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            password: password,
            password_confirmation: password_confirmation,
            agreed: agreed,
        });
    }

    public static isValid(f: FormGroup) {
        return f.valid;
    }
}
