import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorFindComponent } from './actor-find/actor-find.component';
import { ActorNewComponent } from './actor-new/actor-new.component';

const routes: Routes = [
  { path: 'new', component: ActorNewComponent },
  { path: 'find', component: ActorFindComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorRoutingModule { }
