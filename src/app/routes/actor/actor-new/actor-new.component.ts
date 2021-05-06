import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/country';
import { ActorService } from 'src/app/services/actor.service';
import { Actor } from 'src/app/models/actor';
import { BlobFile } from 'src/app/models/blob-file';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-new',
  templateUrl: './actor-new.component.html',
  styleUrls: ['./actor-new.component.css']
})
export class ActorNewComponent implements OnInit {

  private picture: BlobFile | any;

  public form: FormGroup | any;

  countries: Country[] = [];

  selectedCountry: Country | undefined;

  selectedActor: Actor | undefined;

  constructor(private cs: CountryService, private as: ActorService, private router: Router) { }

  ngOnInit(): void {
    this.initCountriesList();
  }

  initCountriesList(): void {
    this.cs.getCountries().subscribe({
      next: response => {
        this.countries = response;
      },
      error: err => console.log(err)
    });
  }

  onSelectedCountry(country: Country) {
    this.selectedCountry = country;
  }

  onSelectedActor(actor: Actor) {
    this.selectedActor = actor;
  }

  onNewActor(actor: Actor) {
    const picture = null;
    this.as.createActor(actor, picture).then(
      (ok) => {
        this.router.navigate(['actor/listado']);
      },
      (err) => {
        alert(err);
      }
    ).finally();
  }
}
