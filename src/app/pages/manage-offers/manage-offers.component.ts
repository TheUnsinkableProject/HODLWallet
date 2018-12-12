import {Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {GeneralService, AuthenticationService} from '../../_services';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SuperComponent} from '../../_components/SuperComponent';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {OffersService} from "../../_services/offers.service";


@Component({
    selector: 'app-manage-offers',
    templateUrl: './manage-offers.component.html',
    styleUrls: ['./manage-offers.component.css']
})
export class ManageOffersComponent extends SuperComponent implements OnInit {
    @ViewChild('buyActive') buyActive: ElementRef;
    @ViewChild('sellActive') sellActive: ElementRef;

    @ViewChild('tabset') tabset: any;
    @ViewChild('unsk') unsk: any;
    @ViewChild('buyunsk') buyunsk: any;
    @ViewChild('orders') orders: any;

    buyForm: FormGroup;
    sellForm: FormGroup;
    sellPrice: FormControl;
    sellAmount: FormControl;
    buyPrice: FormControl;
    buyAmount: FormControl;
    buys = [];
    sells = [];
    sellOffers = [];
    buyOffers = [];

    constructor(private service: OffersService,
                public _globalService: GeneralService,
                private authenticationService: AuthenticationService,
                private _router: Router,
                private _toastr: ToastrService,
                __cdr: ChangeDetectorRef) {

        super(_globalService, _router, _toastr, __cdr);

        this.createFormControls();
        this.createForm();

    }

    ngOnInit() {
        this._globalService.loading(true);
        this.getSells();
        this.getBuys();
        this.getOffers();
        this._globalService.loading(false);
    }

    getSells() {
        this.service.sells().subscribe(result => {
            this.sells = [];
            this.sells = result;
        });
    }

    getBuys() {
        this.service.buys().subscribe(result => {
            this.buys = [];
            this.buys = result;
        });
    }

    refresh(type) {
        if (type == 2) {
            this.getBuys();
            this.getSells();
        } else if (type == 3) {
            this.getOffers();
        }
    }

    moveTo(item, type) {
        console.log(item, type);
        if (type == 'buy') {
            this.buyPrice.setValue(item.price);
            this.buyunsk.active = true;
            this.orders.active = false;
        } else if (type == 'sell') {
            this.sellPrice.setValue(item.price);
            this.unsk.active = true;
            this.orders.active = false;
        }

    }

    sendOffer(type) {
        let buying = type == 'buy' ? 'UNSK' : 'XLM';
        let selling = type == 'buy' ? 'XLM' : 'UNSK';
        let amount = type == 'buy' ? this.buyAmount.value : this.sellAmount.value;
        let price = type == 'buy' ? this.buyPrice.value : this.sellPrice.value;
        let offer = {
            selling: selling,
            buying: buying,
            amount: amount,
            price: price
        };
        let valid = type == 'buy' ? (this.buyForm.valid) : (this.sellForm.valid);
        if (valid) {
            this._globalService.loading(true);
            this.service.saveOffer(offer).subscribe(response => {
                this._globalService.loading(false);
                this._toastr.success('Offer has been bid successfully');
                this.buyForm.reset();
                this.sellForm.reset();
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
        }
    }

    getOffers() {
        this.service.offers().subscribe(result => {
            this.buyOffers = [];
            this.sellOffers = [];
            for (let offer of result) {
                if (offer.action == 'buy') {
                    this.buyOffers.push(offer);
                } else {
                    this.sellOffers.push(offer);
                }
            }
        });
    }

    cancelOffer(id, index, type) {
        if (confirm('Are you sure you want to cancel?')) {
            this.service.cancel(id).subscribe(result => {
                this._toastr.success('Cancelled Successfully');
                if (type == 'buy') {
                    this.buys.splice(index, 1);
                } else {
                    this.sells.splice(index, 1);
                }
            });
        }
    }

    createFormControls() {
        this.sellPrice = new FormControl('', Validators.required);
        this.sellAmount = new FormControl('', Validators.required);
        this.buyPrice = new FormControl('', Validators.required);
        this.buyAmount = new FormControl('', Validators.required);

    }

    createForm() {
        this.buyForm = new FormGroup({
            buyPrice: this.buyPrice,
            buyAmount: this.buyAmount,
        });

        this.sellForm = new FormGroup({
            sellPrice: this.sellPrice,
            sellAmount: this.sellAmount,
        });
    }

}
