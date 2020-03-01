import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'
import {DataStoreService} from '../services/data-store.service'

@Component({
  selector: 'app-data-input-side',
  templateUrl: './data-input-side.component.html',
  styleUrls: ['./data-input-side.component.css']
})
export class DataInputSideComponent implements OnInit {

  constructor(private dataService:DataStoreService, public auth:AuthServiceService) { }

  ngOnInit(): void {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }




}
