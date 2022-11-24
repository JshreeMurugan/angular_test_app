import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { NewComponent } from './new/new.component';
import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComponentsModule } from './ui-components/compoents.modules';
import { PipesModule } from './pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './directives/highlight.directive';
import { AppNotDirective } from './directives/app-not.directive';
@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    SecondComponent,
    FirstComponent,
    PageNotFoundComponent,
    HighlightDirective,
    AppNotDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PipesModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
