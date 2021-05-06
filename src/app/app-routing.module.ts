import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './routes/busqueda/busqueda.component';

const routes: Routes = [
  { path: 'actor', loadChildren: () => import('./routes/actor/actor.module').then(m => m.ActorModule) }, 
  { path: 'movie', loadChildren: () => import('./routes/movie/movie.module').then(m => m.MovieModule) },
  { path: 'busqueda', component: BusquedaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
