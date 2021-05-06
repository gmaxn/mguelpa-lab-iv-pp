import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorRoutingModule } from './actor-routing.module';
import { ActorNewComponent } from './actor-new/actor-new.component';
import { AppSharedModule } from 'src/app/app-shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ActorNewFormComponent } from 'src/app/components/actor/actor-new-form/actor-new-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActorFindComponent } from './actor-find/actor-find.component';


@NgModule({
  declarations: [
    ActorNewComponent,
    ActorNewFormComponent,
    ActorFindComponent
  ],
  imports: [
    CommonModule,
    ActorRoutingModule,
    AppSharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ActorModule { }
