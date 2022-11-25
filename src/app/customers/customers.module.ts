import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ProfileGuard } from '../guards/profile.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  providers: [ProfileGuard]
})
export class CustomersModule { }
