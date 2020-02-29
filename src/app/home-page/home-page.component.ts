import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private auth:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  printUser(event) {
    console.log('logged in')
    this.router.navigate(['dashboard'])
    }

printError(event) {
    console.error(event);
}

}
