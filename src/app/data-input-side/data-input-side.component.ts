import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'
import {DataStoreService} from '../services/data-store.service'
import { saveAs } from 'file-saver';

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

  downloadExcel() {
        this.dataService.downloadExcel().subscribe(
          res => {
              const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
              const file = new File([blob], `${this.dataService.doc.personalInfo.sheetName}.xlsx`, { type: 'application/vnd.ms.excel' });
              saveAs(file);
          },
          res => {
              console.error("Error downloading File")
          }
      );

  }

  deletePlan() {
    if(Object.keys(this.dataService.plans).length > 1) {
      if(confirm(`Are you sure you want to delete ${this.dataService.doc.personalInfo.sheetName} plan`)) {
        this.dataService.deletePlan();
      }
    } else {
      alert('You need to have at least one plan')
    }
    
  }




}
