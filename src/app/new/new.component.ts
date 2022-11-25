import { removeSummaryDuplicates } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, fromEvent, interval, Subject, Subscription, forkJoin, of, combineLatest, timer, concat, empty, zip, pipe, BehaviorSubject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, throttleTime, pluck, catchError, mergeMap, delay, startWith, concatAll, tap, filter, concatMap, exhaustMap, switchMap, take, exhaustAll } from 'rxjs/operators';
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

  value: BehaviorSubject<any> = new BehaviorSubject<any>(0); 

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
    this.combineLatestOperator();
    this.concatOperator();
    this.concatAllOperator();
    this.zipOperator();
    this.tapOperator();
    this.conCatMapOperator();
    this.exhaustMapOperator();
    this.switchMapOperator();
    this.exhaustAllOperator();
    this.newForkJoin();
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
    const numbers = of(1, 2, 3)
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

  combineLatestOperator() {
    // // 1. Define multiple observables
    // let color = of('Black', 'Red', 'Blue');
    // let brand = of('Jaguar', 'Ford', 'BMW');
    // let price = of(100, 200, 300);

    // // 2. Call combineLatest operator, inject multiple observables in array
    // const joinStream = combineLatest(color, brand, price);

    // // 3. Subscibe combineLatest observable
    // const subscribe = joinStream.subscribe(([color, brand, price]) => {
    //   console.log(color + ' ' + brand + ' ' + 'costed me' + ' ' + price);
    // });

    // timerOne emits first value at 1s, then once every 4s
    const timerOne$ = timer(1000, 4000);
    // timerTwo emits first value at 2s, then once every 4s
    const timerTwo$ = timer(2000, 4000);
    // timerThree emits first value at 3s, then once every 4s
    const timerThree$ = timer(3000, 4000);

    // when one timer emits, emit the latest values from each timer as an array
    combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
      ([timerValOne, timerValTwo, timerValThree]) => {
        /*
          Example:
        timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
        timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
        timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
      */
        console.log(
          `Timer One Latest: ${timerValOne},
     Timer Two Latest: ${timerValTwo},
     Timer Three Latest: ${timerValThree}`
        );
      }
    );
  }

  concatOperator() {
    console.log('concatOperator');
    concat(
      of(1, 2, 3),
      // subscribed after first completes
      of(4, 5, 6),
      // subscribed after second completes
      of(7, 8, 9)
    ).subscribe(console.log);

    const userMessage = document.getElementById('message');

    const delayedMessage = (message, delayedTime = 1000) => {
      return empty().pipe(startWith(message), delay(delayedTime));
    }
    if (userMessage != null) {
      concat(delayedMessage('message'),
        delayedMessage('1'),
        delayedMessage('2'),
        delayedMessage('3'),
        delayedMessage('', 2000)
      ).subscribe(message => userMessage.innerHTML = message);
    }

  }


  concatAllOperator() {
    console.log('concatAllOperator');
    const source = interval(1000);
    const example = source.pipe(
      map(val => of(val + 10)), concatAll()
    )

    example.subscribe(val => { console.log('hi' + val) });
  }

  zipOperator() {
    console.log('zipOperator');

    let age$ = of(27, 25, 29);
    let name$ = of('Foo', 'Bar', 'Beer');
    let isDev$ = of(true, true, false);

    zip(age$, name$, isDev$).pipe(
      map(([age, name, isDev]) => ({ age, name, isDev })),
    )
      .subscribe(x => console.log(x));

    // outputs
    // { age: 27, name: 'Foo', isDev: true }
    // { age: 25, name: 'Bar', isDev: true }
    // { age: 29, name: 'Beer', isDev: false }
  }

  tapOperator() {
    console.log('tapOperator');

    of(1, 2, 3, 4, 5)
      .pipe(
        tap(val => {
          console.log("before " + val);
        }),
        map(val => {
          return val + 5;
        }),
        tap(val => {
          console.log("after " + val);
        })
      )
      .subscribe(val => console.log(val));


    let list1 = of(1, 2, 3, 4, 5, 6);
    let final_val = list1.pipe(
      tap(x => console.log("From tap() =" + x),
        e => console.log(e),
        () => console.log("Task complete")),
      filter(a => a % 2 === 0)
    );
    final_val.subscribe(x => console.log("Only Even numbers=" + x));

  }


  conCatMapOperator() {
    let srcObservable = of(1, 2, 3, 4)
    let innerObservable = of('A', 'B', 'C', 'D')

    srcObservable.pipe(
      concatMap(val => {
        console.log('Source value ' + val)
        console.log('starting new observable')
        return innerObservable
      })
    )
      .subscribe(ret => {
        console.log('Recd ' + ret);
      })
  }


  exhaustMapOperator() {

    let srcObservable = of(1, 2, 3, 4)
    let innerObservable = of('A', 'B', 'C', 'D')

    srcObservable.pipe(
      exhaustMap(val => {
        console.log('Source value ' + val)
        console.log('starting new observable')
        return innerObservable
      })
    )
      .subscribe(ret => {
        console.log('Recd ' + ret);
      })
  }

  switchMapOperator() {
    let text = of('Hello guys, Welcome To');
    let case1 = text.pipe(switchMap((value) => of(value + ' JavaTpoint!')));
    case1.subscribe((value) => { console.log(value); });
  }

  exhaustAllOperator() {
    console.log('exhaustAllOperator');
    
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(
      map(() => interval(1000).pipe(take(5)))
    );
    const result = higherOrder.pipe(exhaustAll());
    result.subscribe(x => console.log(x));
  }

  newForkJoin() {
    console.log('NewForkJoin');
    const source1 = [1,2,3]
    const source2 = [1,2,3]

    const example = forkJoin([source1, source2])
    example.subscribe(val => console.log(val))
    
    // const test = of('here is an example')
   console.log(of([1, 2, 3], 'welcome').subscribe(x => console.log(x)))
  }


  navigateToNewCompoent() {
    this.router.navigate(['first-component']);
  }

}
