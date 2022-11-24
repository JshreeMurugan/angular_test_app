import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNot]'
})
export class AppNotDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    console.log('condition');
   }
  @Input() set appNot(condition: boolean) {
    console.log('condition');
    
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
