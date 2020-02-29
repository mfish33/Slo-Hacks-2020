import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray } from '@angular/forms'

@Component({
  selector: 'app-basic-info',
  template: `
    <mat-card class="card">
    <h2>Basic Info:</h2>
        <form [formGroup]="basicInfoForm" class="example-form">
                

            
                        <mat-form-field class="example-full-width" class="example-full-width">
                                <input matInput formControlName="sheetName" placeholder="Plan Name">
                        </mat-form-field>
            
                        <div id="container">
            
                          <mat-form-field class="spread">
                                  <input matInput formControlName="income" placeholder="income" type="number" min="0">
                                  <mat-icon matSuffix>attach_money</mat-icon>
                          </mat-form-field> 
              
                          <mat-form-field class="spread">
                                  <input matInput formControlName="age" placeholder="age" type="number" min="0">
                          </mat-form-field>
              
                          <mat-form-field class="spread">
                          <select matNativeControl placeholder = "State">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                          </select>
                          </mat-form-field>
                        </div>


                
            </form>
                  
</mat-card>

  `,
  styles: [':host{margin:20px;}','  #container{display: flex;justify-content: space-between;}',' .spread{width: 26%}']
})
export class BasicInfoComponent implements OnInit {

  basicInfoForm:FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.basicInfoForm = this.fb.group({
      sheetName:'',
      income:0,
      age:25,
      state:'',
    })
  }

}
