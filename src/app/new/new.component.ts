import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }
  navigateToNewCompoent() {
    this.router.navigate(['first-component']);
  }
}
