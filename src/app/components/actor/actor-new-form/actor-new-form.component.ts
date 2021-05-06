import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { BlobFile } from 'src/app/models/blob-file';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-actor-new-form',
  templateUrl: './actor-new-form.component.html',
  styleUrls: ['./actor-new-form.component.css']
})
export class ActorNewFormComponent implements OnInit, OnChanges {

  public form: FormGroup  | any;
  private picture: BlobFile | any;

  @Input() selectedCountry: Country | any;
  @Output() newActor: EventEmitter<Actor> = new EventEmitter<Actor>();

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  ngOnChanges(): void {

    if (this.form) {
      this.form.patchValue({
        nacionalidad: this.selectedCountry.name
      });
    }
  }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      uid:'',
      nombre:'',
      apellido:'',
      nacimiento: '',
      sexo:'',
      nacionalidad: '',
      imageUrl: '',
    });
  }

  onSubmit() {
    const actor = this.form.value as Actor;
    const picture = null;
    this.newActor.emit(actor);
  }

  changeGender(e:Event) {
    const value = (<HTMLOptionElement>e.target).value;
    if (this.form) {
      this.form.patchValue({
        sexo: value
      });
    }
  }
}
