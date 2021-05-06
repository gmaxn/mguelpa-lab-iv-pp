import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppSharedModule } from './app-shared.module';
import { AppComponent } from './app.component';
import { SigninFormComponent } from './components/user/signin-form/signin-form.component';
import { BienvenidaComponent } from './routes/bienvenida/bienvenida.component';
import { BusquedaComponent } from './routes/busqueda/busqueda.component';
import { SigninComponent } from './routes/signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    BienvenidaComponent,
    SigninFormComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    AngularFirestoreModule,
    AppSharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
