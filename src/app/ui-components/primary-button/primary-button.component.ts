/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent implements OnInit {

  @Input() label;
  @Input() isDisabled;
  @Input() isLight;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  clickEvent() {
    return this.onClick.emit();
  }

}
