import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  profile;
  constructor(private router: Router) { 
   this.profile = this.router.getCurrentNavigation()?.extras.state?.['userData'];
   console.log('this.profile', this.profile);
   

  }

  ngOnInit(): void {
  }

}
