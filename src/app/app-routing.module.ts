import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'contacts', component: ContactsComponent},
  { path: 'list', component: ListComponent},
  { path: '', component: ContactsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
