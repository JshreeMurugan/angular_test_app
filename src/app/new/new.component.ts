import { removeSummaryDuplicates } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, fromEvent, interval, Subject, Subscription, forkJoin, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, throttleTime, pluck, catchError, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  customArray: any[] = [1, 1, 2, 2, 3, 3];
  firstname;
  valueChanged: Subject<string> = new Subject<string>();
  inputSub!: Subscription;

  public consoleMessages: string[] = [];
  public userQuestion!: string;
  userQuestionUpdate = new Subject<string>();

  constructor(public router: Router) {

    this.userQuestionUpdate.pipe(
      debounceTime(800),
      distinctUntilChanged())
      .subscribe(value => {
        this.consoleMessages.push(value);
      });
  }

  ngOnInit(): void {

    let result: any = [];
    let index = 0;
    let temp = {};
    let newResult;
    for (let i = 0; i < this.customArray.length; i++) {
      if (!temp[this.customArray[i]]) {
        temp[this.customArray[i]] = 1;
        result[index] = this.customArray[i];
        index++;
      }
    }
    newResult = result;
    console.log(newResult);

    this.operatormap()
  }

  operatormap() {
    const source = from(this.customArray); // from used to emit value of the variable
    let newArray: any = [];
    const example = source.pipe(map(val => val + 10));
    example.subscribe(val => {
      console.log(val)
      newArray.push(val);
    });
    console.log(newArray);
    this.distinctUntilChanged();
  }

  ngAfterContentInit() {
    this.inputSub = this.valueChanged.pipe(debounceTime(1000)).subscribe(value => {
      this.firstname = value
      // do your API call from here
      console.log(value)
    });
  }

  onChangeInput(text: string) {
    this.valueChanged.next(text);
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }


  distinctUntilChanged() {
    console.log('this.customArray before distinctUntilChanged', this.customArray);

    const source = from(this.customArray);
    let newArray: any = [];
    source.pipe(distinctUntilChanged()).subscribe(val => {
      newArray.push(val);
    });

    console.log('this.customArray before distinctUntilChanged', newArray);
    this.throttleTimeOperator();
    this.forkJoin();
    this.pluckOperator();
    this.catchOperator();
    this.mergeMapOperator();
  }

  throttleTimeOperator() {
    console.log('throttleTimeOperator');

    // emit value every 1 second
    const source = interval(1000);
    /*
      emit the first value, then ignore for 5 seconds. repeat...
    */
    const example = source.pipe(throttleTime(5000));
    // output: 0...6...12
    example.subscribe(val => console.log(val));

  }

  forkJoin() {
    console.log('forkJoinOperator');

    /*
  when all observables complete, provide the last
  emitted value from each as dictionary
*/
    let list1 = of(1, 2, 3, 4, 5);
    let list2 = of(6, 7, 8, 9, 10);
    let list3 = of(6, 7, 8, 9, 100);
    let final_val = forkJoin([list1, list2, list3]);
    final_val.subscribe(x => console.log(x));
  }

  pluckOperator() {
    console.log('pluck Operator');

    const source = from([
      { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
      //will return undefined when no job is found
      { name: 'Sarah', age: 35 }
    ]);
    //grab title property under job
    const example = source.pipe(pluck('job', 'language'));
    //output: "JavaScript" , undefined
    const subscribe = example.subscribe(val => console.log(val));
  }

  catchOperator() {
    console.log('catchOperator');

    of(1, 2, 3, 4, 5).pipe(
      map(n => {
        if (n === 4) {
          throw 'four!';
        }
        return n;
      }),
      catchError(err => of('I', 'II', 'III', 'IV', 'V')),
    )
      .subscribe(x => console.log(x));
    // 1, 2, 3, I, II, III, IV, V
  }

  mergeMapOperator() {
    console.log('mergeMapOperator');
    
    const letters = of('a', 'b', 'c');
    const numbers = of (1,2,3)
    const result = letters.pipe(
      mergeMap(x => numbers.pipe(map(i => x + i))),
    );
    result.subscribe(x => console.log(x));

    // const newResult = letters.pipe(
    //   mergeMap(x => interval(5000).pipe(map(i => x + i))),
    // );
    // newResult.subscribe(x => console.log(x)); 



    // Results in the following:
    // a0
    // b0
    // c0
    // a1
    // b1
    // c1
    // if setInterval continues to list a,b,c with respective ascending integers
  }


  navigateToNewCompoent() {
    this.router.navigate(['first-component']);
  }

}
