import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomerProfileComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
