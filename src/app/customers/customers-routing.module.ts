import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileGuard } from '../guards/profile.guard';
import { SecondComponent } from '../second/second.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomersComponent } from './customers.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'second-component', component: SecondComponent },
  { path: 'customer-profile', component: CustomerProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent,  canActivate : [ProfileGuard]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
