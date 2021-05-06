import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Actor } from 'src/app/models/actor';

@Component({
  selector: 'app-actor-grid',
  templateUrl: './actor-grid.component.html',
  styleUrls: ['./actor-grid.component.css']
})
export class ActorGridComponent implements OnInit {

  @Input() actors: Actor[] = [];

  @Output() selectedActor: EventEmitter<Actor> = new EventEmitter<Actor>();

  constructor() { }


  ngOnInit(): void {
    console.log(this.actors);
  }

  onSelection(actor:Actor) {
    this.selectedActor.emit(actor);
  }

}
