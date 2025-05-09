import { Component } from '@angular/core';
import { CountryService } from '../../../services/country.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CountryComponent } from "../country/country.component";

@Component({
  selector: 'app-home',
  imports: [NgFor, CountryComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  countries: any[] = [];
  loading = true;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.countryService.searchCompleted.subscribe((term:string) => {
          this.countries = this.countryService.searchCountry(term);
        });
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  



}
