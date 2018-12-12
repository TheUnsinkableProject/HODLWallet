import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Withdraw} from '../../_models/withdraw';
import {FormBuilder} from '../../../../node_modules/@angular/forms';
import {HistoryService} from '../../_services/history.service';
import {GeneralService} from '../../_services';
import {ToastrService} from '../../../../node_modules/ngx-toastr';
import {Router} from "@angular/router";

@Component({
    selector: 'app-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
    withForm: FormGroup;
    destination: FormControl;
    asset: FormControl;
    amount: FormControl;
    memo: FormControl;
    value: string = '';
    user: any;
    msgs = [];
    errorMsgs = [];
    withdraw: Withdraw;
    balance = '';
    currentBalance = '';

    constructor(private service: HistoryService,
                private _toastr: ToastrService,
                private _router: Router,
                private _globalService: GeneralService) {
        this.withdraw = new Withdraw();
    }

    ngOnInit() {
        this.user = localStorage.getItem('currentUser');
        this.user = JSON.parse(this.user);
        let currentUser = this.user;

        if (currentUser)
            this.value = currentUser["account"];

        this._globalService.loading(true);
        this._globalService.get('/account/getbalance').subscribe(balance => {
            this.balance = balance;
            this.currentBalance = this.balance['XLM'];
            this._globalService.loading(false);
        }, error => {
            this._globalService.loading(true);
        });

        this.createFormControls();
        this.createForm();
    }

    goToPay() {
        this._router.navigate(['/payoff']);
    }

    onBalanceChange($event) {
        let value = $event.target.value;
        if (value == 'XLM') {
            this.currentBalance = this.balance['XLM'];
        } else {
            this.currentBalance = '0';
        }
    }

    confirmWithdraw() {
        let withdraw = {
            destination: this.destination.value,
            asset: this.asset.value,
            amount: this.amount.value,
            memo: this.memo.value,
        };
        if (this.withForm.valid) {
            this._globalService.loading(true);
            this.service.saveWithdraw(withdraw, this.user['id_token']).subscribe((response) => {
               
                this._globalService.loading(false);
                this._toastr.success(response.message);
                this.withForm.reset();
                this.updateCurrentBalance();
              
            }, error => {
                const errorData = error.error;
                this._globalService.loading(false);
                if (errorData.message) {
                   // this._toastr.error(errorData.message);
                   this._toastr.error("You must leave 2 XLM in your account for Stellar minimum balance");
                }
                if (errorData.errors) {
                    this.msgs = Object.values(errorData.errors);
                    for (const msg of this.msgs) {
                        this._toastr.error(msg);
                    }
                }
            });
    
            
        }
    }

    createFormControls() {
        this.destination = new FormControl('', Validators.required);
        // this.password = new FormControl('', Validators.required);
        this.asset = new FormControl('XLM', [Validators.required]);
        this.amount = new FormControl('', Validators.required);
        this.memo = new FormControl('', [Validators.maxLength(28)]);
    }

    createForm() {
        this.withForm = new FormGroup({
            destination: this.destination,
            asset: this.asset,
            amount: this.amount,
            // password: this.password,
            memo: this.memo,
        });
    }
    updateCurrentBalance(){
        this._globalService.get('/account/getbalance').subscribe(balance => {
            this.balance = balance;
            this.currentBalance = this.balance['XLM'];
                  
        }, error => {
                  
      });
    }
}
