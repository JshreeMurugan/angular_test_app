import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import data from '../../assets/strings/schema.json';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private router: Router) { 
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        console.log(event);
      }
    })

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEvent) => {
      console.log('event', event);
      
    }) 
  }

  ngOnInit(): void {

  }

  openCustomerProfile() {
    this.router.navigate(['customers/customer-profile'], {state: {userData : data.userData}})
  }

}
