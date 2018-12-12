import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';

import {AlertService, AuthenticationService, GeneralService} from './_services';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {RoutesModule} from './routes/routes.module';
import {LoginComponent} from './pages/login/login.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {ContentHeaderComponent} from './components/content-header/content-header.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from './_guards';
import {JwtInterceptor} from './_helpers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlockUIModule} from 'ng-block-ui';
import {ControlMessagesComponent} from './components/messages/control-messages.component';
import {UserService} from './_services/user.service';
import {PayOffComponent} from './pages/payoff/payoff.component';
import {DepositComponent} from './pages/deposit/deposit.component';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {WithdrawComponent} from './pages/withdraw/withdraw.component';
import {HistoryComponent} from './pages/history/history.component';
import {HistoryService} from './_services/history.service';
import {KeypairComponent} from './pages/keypair/keypair.component';
import {KeyPairService} from './_services/keypair.service';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {ManageOffersComponent} from './pages/manage-offers/manage-offers.component';
import {TabsModule} from "ngx-tabset";
import {OffersService} from "./_services/offers.service";
import { AccountComponent } from './pages/account/account.component';
import { HodlComponent } from './pages/hodl/hodl.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        DashboardComponent,
        LoginComponent,
        SideBarComponent,
        ContentHeaderComponent,
        ControlMessagesComponent,
        PayOffComponent,
        DepositComponent,
        WithdrawComponent,
        HistoryComponent,
        KeypairComponent,
        ChangePasswordComponent,
        ManageOffersComponent,
        AccountComponent,
        HodlComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RoutesModule,
        BrowserModule,
        BrowserAnimationsModule,
        TabsModule.forRoot(),
        HttpModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BlockUIModule.forRoot(
            {
                message: 'Loading...'
            }
        ),
        NgxQRCodeModule,
    ],
    exports: [
        BlockUIModule,
        ControlMessagesComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        UserService,
        AuthenticationService,
        GeneralService,
        HistoryService,
        KeyPairService,
        OffersService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
