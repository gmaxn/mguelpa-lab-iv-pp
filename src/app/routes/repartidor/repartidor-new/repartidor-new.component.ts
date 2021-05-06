import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { ActorService } from 'src/app/services/actor.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-repartidor-new',
  templateUrl: './repartidor-new.component.html',
  styleUrls: ['./repartidor-new.component.css']
})
export class RepartidorNewComponent implements OnInit {

  countries: Country[] = [];

  selectedCountry: Country | undefined;

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

}
