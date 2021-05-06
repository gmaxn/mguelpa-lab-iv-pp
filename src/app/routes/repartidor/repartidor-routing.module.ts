import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepartidorNewComponent } from './repartidor-new/repartidor-new.component';

const routes: Routes = [
  { path: '', component: RepartidorNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepartidorRoutingModule { }
