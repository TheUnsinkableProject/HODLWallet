import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';
import { UserService } from '../../_services/user.service';


@Component({
    selector: 'app-content-header',
    templateUrl: './content-header.component.html',
    styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {
    user: any = {};
    constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

    ngOnInit() {
        this.user = this.userService.getCurrentUser();
    }


    logout() {
        this.authenticationService.logout();
    }
}
