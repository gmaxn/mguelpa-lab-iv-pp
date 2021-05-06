import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './routes/bienvenida/bienvenida.component';
import { BusquedaComponent } from './routes/busqueda/busqueda.component';
import { SigninComponent } from './routes/signin/signin.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: SigninComponent },

  { path: 'actor', loadChildren: () => import('./routes/actor/actor.module').then(m => m.ActorModule) }, 
  { path: 'movie', loadChildren: () => import('./routes/movie/movie.module').then(m => m.MovieModule) },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'repartidor', loadChildren: () => import('./routes/repartidor/repartidor.module').then(m => m.RepartidorModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
