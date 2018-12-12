import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string ='';
  constructor() { }

  ngOnInit() {
    let user = localStorage.getItem('currentUser');
    user = JSON.parse(user);
    if(user)
      this.value = user["account"];
  }

}
