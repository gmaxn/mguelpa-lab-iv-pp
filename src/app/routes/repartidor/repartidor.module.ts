import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepartidorRoutingModule } from './repartidor-routing.module';
import { RepartidorNewComponent } from './repartidor-new/repartidor-new.component';
import { RepartidorNewFormComponent } from 'src/app/components/repartidor/repartidor-new-form/repartidor-new-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from 'src/app/app-shared.module';


@NgModule({
  declarations: [
    RepartidorNewComponent,
    RepartidorNewFormComponent
  ],
  imports: [
    CommonModule,
    RepartidorRoutingModule,
    ReactiveFormsModule,
    AppSharedModule
  ]
})
export class RepartidorModule { }
