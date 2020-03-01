import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {DataStoreService} from '../services/data-store.service';
import {debounceTime, take, debounce} from 'rxjs/operators';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styles: [':host{margin:20px;}','  #container{display: flex;justify-content: space-between;}',' .spread{width: 26%}']
})
export class BasicInfoComponent implements OnInit {

  basicInfoForm: FormGroup

  objectKeys = Object.keys

  states = {
   AK : 'Alabama',
   AL : 'Alaska',
   AR : 'Arizona',
   AZ : 'Arkansas',
   CA : 'California',
   CO : 'Colorado',
   CT : 'Connecticut',
   DE : 'Delaware',
   FL : 'Florida',
   GA : 'Georgia',
   HI : 'Hawaii',
   IA : 'Idaho',
   ID : 'Illinois',
   IL : 'Indiana',
   IN : 'Iowa',
   KS : 'Kansas',
   KY : 'Kentucky',
   LA : 'Louisiana',
   MA : 'Maine',
   MD : 'Maryland',
   ME : 'Massachusetts',
   MI : 'Michigan',
   MN : 'Minnesota',
   MO : 'Mississippi',
   MS : 'Missouri',
   MT : 'Montana',
   NC : 'North Carolina',
   ND : 'North Dakota',
   NE : 'Nebraska',
   NH : 'New Hampshire',
   NJ : 'New Jersey',
   NM : 'New Mexico',
   NV : 'Nevada',
   NY : 'New York',
   OH : 'Ohio',
   OK : 'Oklahoma',
   OR : 'Oregon',
   PA : 'Pennsylvania',
   RI : 'Rhode Island',
   SC : 'South Carolina',
   SD : 'South Dakota',
   TN : 'Tennessee',
   TX : 'Texas',
   UT : 'Utah',
   VA : 'Virginia',
   VT : 'Vermont',
   WA : 'Washington',
   WI : 'Wisconsin',
   WV : 'West Virginia',
   WY : 'Wyoming'
  }

  constructor(private fb: FormBuilder, private dataService: DataStoreService) {
    this.basicInfoForm = this.fb.group({
      sheetName:'',
      income:0,
      age:25,
      state:'',
    });
   }

  ngOnInit(): void {
    

    this.dataService.doc$.pipe(take(1)).subscribe(retreive => {
         this.basicInfoForm.patchValue(retreive.personalInfo);
      });

    this.basicInfoForm.valueChanges.pipe(debounceTime(500))
      .subscribe(update =>{
         this.dataService.updateData({personalInfo: update});
      });
   }
}
