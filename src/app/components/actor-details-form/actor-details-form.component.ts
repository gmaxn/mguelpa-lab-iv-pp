import { Component, Input, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor';

@Component({
  selector: 'app-actor-details-form',
  templateUrl: './actor-details-form.component.html',
  styleUrls: ['./actor-details-form.component.css']
})
export class ActorDetailsFormComponent implements OnInit {

  @Input() selectedActor: Actor | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
