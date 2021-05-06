import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieFindComponent } from './movie-find/movie-find.component';
import { MovieNewComponent } from './movie-new/movie-new.component';

const routes: Routes = [
  { path: 'new', component: MovieNewComponent },
  { path: 'find', component: MovieFindComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
