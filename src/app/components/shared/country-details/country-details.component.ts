import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryService } from '../../../services/country.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-country-details',
  imports: [RouterLink, NgIf],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css'
})
export class CountryDetailsComponent {
  country: any = {};
  loading = true;

  constructor(private activatedRoute: ActivatedRoute,
    private countryService: CountryService
  ) {

    this.activatedRoute.params.subscribe(params => {
      if (params['name']) {

        this.country = this.countryService.getCountryByName(params['name']).subscribe({
          next: (data) => {
            this.country = data[0];
            this.loading = false;
          },
          error: () => (this.loading = false),
        });
      }
    });

  }
}
