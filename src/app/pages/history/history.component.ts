import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../_services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  transactions = [];
  constructor(private service: HistoryService) { }

  ngOnInit() {
    this.service.all().subscribe((response)=>{
      this.transactions = response;
    });
  }

}
