import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-grid',
  templateUrl: './country-grid.component.html',
  styleUrls: ['./country-grid.component.css']
})
export class CountryGridComponent implements OnInit {

  @Input() countries:any[] = [];
  @Output() selectedCountry: EventEmitter<Country> = new EventEmitter<Country>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedCountry(country:Country) {
    this.selectedCountry.emit(country);
  }
}