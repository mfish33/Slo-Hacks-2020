import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service'

@Component({
  selector: 'app-graph-side',
  templateUrl: './graph-side.component.html',
  styleUrls: ['./graph-side.component.css']
})
export class GraphSideComponent implements OnInit {

  constructor(public dataStore:DataStoreService) { }

  ngOnInit(): void {
  }

}
