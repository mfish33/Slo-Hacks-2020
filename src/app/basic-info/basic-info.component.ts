import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {DataStoreService} from '../services/data-store.service';
import {debounceTime, take, debounce, tap} from 'rxjs/operators';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
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

  taxInfo = {
      effectiveTaxRate: 0.0,
      totalIncomeTax: 0.0,
      incomeAfterTaxes: 0.0
  };

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
      

    this.basicInfoForm.valueChanges.pipe(
      tap((change) => {
            this.taxInfo.totalIncomeTax = this.calculateTaxes(change.income);
            this.taxInfo.effectiveTaxRate = this.taxInfo.totalIncomeTax / change.income;
            this.taxInfo.incomeAfterTaxes = change.income - this.taxInfo.totalIncomeTax;
         }),
      debounceTime(500))
      .subscribe(update =>{
         this.dataService.updateData({personalInfo: update});
         this.dataService.updateData({taxes: this.taxInfo});
      });
   }

   calculateTaxes(income) {
      let total = 0.0;
      if (income > 510300) {
         total  = (income - 510300) * .37 +
                  (510300 - 204100) * .35 +
                  (204100 - 160725) * .32 +
                  (160725 - 84200) * .24 +
                  (84200 - 39475) * .22 +
                  (39475 - 9700) * .12 +
                  9700 * .1;
      } else if (income > 204100) {
         total  = (income - 204100) * .35 +
                  (204100 - 160725) * .32 +
                  (160725 - 84200) * .24 +
                  (84200 - 39475) * .22 +
                  (39475 - 9700) * .12 +
                  9700 * .1;
      } else if (income > 160725) {
         total = (income - 160726) * .32 +
                  (160725 - 84200) * .24 +
                  (84200 - 39475) * .22 +
                  (39475 - 9700) * .12 +
                  9700 * .1;
      } else if (income > 84200) {
         total = (income - 84200) * .24 +
                  (84200 - 39475) * .22 +
                  (39475 - 9700) * .12 +
                  9700 * .1;
      } else if (income > 39475) {
         total = (income - 39475) * .22 +
                  (39475 - 9700) * .12 +
                  9700 * .1;
      } else if (income > 9700) {
         total = (income - 9700) * .12 +
                  9700 * .1;
      } else {
         total = income * .1;
      }
      return total;
   }

   formatMoney(money) {
      return money.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

   get showTaxSection(): boolean {
      return this.basicInfoForm.get('state').value !== '' && this.basicInfoForm.get('income').value !== 0;
   }
}
