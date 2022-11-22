import { removeSummaryDuplicates } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  customArray : any[] = [55,76,88,45,76,87,76];
  firstname;
  constructor( public router: Router) { }

  ngOnInit(): void {
   
    this.getNewArray(this.customArray)
    
  }

  getNewArray(array) {
    let result: any = [];
    let index = 0;
    let  temp = {};

    for (let i = 0; i < this.customArray.length; i++) {
      if (!temp[this.customArray[i]]) {
        temp[this.customArray[i]] = 1;
        result[index] = this.customArray[i];
        index++;
      }
    }
    console.log(result);
  } 

  navigateToNewCompoent() {
    this.router.navigate(['first-component']);
  }
  
}
