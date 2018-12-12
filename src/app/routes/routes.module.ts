import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { RegisterComponent } from '../pages/register/register.component';
import { LoginComponent } from '../pages/login/login.component';
import { PayOffComponent } from '../pages/payoff/payoff.component';
import { AuthGuard } from '../_guards/auth.guard';
import { DepositComponent } from '../pages/deposit/deposit.component';
import { WithdrawComponent } from '../pages/withdraw/withdraw.component';
import { HistoryComponent } from '../pages/history/history.component';
import { KeypairComponent } from '../pages/keypair/keypair.component';
import { ChangePasswordComponent } from '../pages/change-password/change-password.component';
import { ManageOffersComponent } from '../pages/manage-offers/manage-offers.component';
import {AccountComponent} from "../pages/account/account.component";
import { HodlComponent } from '../pages/hodl/hodl.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'account', component: AccountComponent },
    { path: 'hodl', component: HodlComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'payoff', component: PayOffComponent, canActivate: [AuthGuard] },
    { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard] },
    { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard] },
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
    { path: 'keypair', component: KeypairComponent, canActivate: [AuthGuard] },
    { path: 'manage-offers', component: ManageOffersComponent, canActivate: [AuthGuard] },
    {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class RoutesModule {
}
