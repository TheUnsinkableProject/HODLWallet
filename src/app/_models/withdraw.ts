import { FormBuilder, FormControl, Validators, FormGroup } from "../../../node_modules/@angular/forms";
import { CustomValidators } from "../../../node_modules/ngx-custom-validators";

export class Withdraw {
    from: string;
    to: string;
    amount: string;
    asset: string;
    password: string;

    public static buildForm(fb: FormBuilder): FormGroup {
        const password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
        const from = new FormControl('', Validators.compose([Validators.required]));
        const to = new FormControl('', Validators.compose([Validators.required]));
        const amount = new FormControl('', Validators.compose([Validators.required]));
        const asset = new FormControl('', Validators.compose([Validators.required]));
        return fb.group({
            name: [null, Validators.compose([Validators.required])],
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            password: password,
            amount: amount,
            from: from,
            to: to,
            asset: asset
        });
    }
}


