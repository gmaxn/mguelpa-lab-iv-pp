import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { BlobFile } from 'src/app/models/blob-file';
import { Country } from 'src/app/models/country';
import { Repartidor } from 'src/app/models/repartidor';
import { RepartidorService } from '../../../services/repartidor.service';

@Component({
  selector: 'app-repartidor-new-form',
  templateUrl: './repartidor-new-form.component.html',
  styleUrls: ['./repartidor-new-form.component.css']
})
export class RepartidorNewFormComponent implements OnInit, OnChanges {

  public form: FormGroup  | any;
  private picture: BlobFile | any;

  @Input() selectedCountry: Country | any;
  @Output() newActor: EventEmitter<Actor> = new EventEmitter<Actor>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rs: RepartidorService
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
      uid:[''],
      dni:['', [Validators.required, Validators.pattern(/^\d{08}$/)]],
      nombre: ['', [Validators.required]], 
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      capacidad: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      nacionalidad: ['', [Validators.required]],
      unidadPropia: ['', Validators.required]

    });
  }

  onSubmit() {
    const actor = this.form.value as Actor;
    const picture = null;

    this.form.markAllAsTouched();

    if(this.form.status === "VALID") {

      const rep = this.form.value as Repartidor;

      const picture = null;
      this.rs.createRepartidor(rep, picture).then(
        (ok) => {
          this.router.navigate(['bienvenida']);
        },
        (err) => {
          alert(err);
        }
      ).finally();
    }
    //console.log(this.form);return
    //this.newActor.emit(actor);
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
