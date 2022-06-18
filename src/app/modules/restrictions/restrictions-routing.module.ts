import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestrictionsComponent } from './pages/restrictions.component';

const routes: Routes = [{ path: '', component: RestrictionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestrictionsRoutingModule { }
