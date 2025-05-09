import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { Country, CountryDetails } from '../interface/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';
  private cachedData: any;
  private cachedTimestamp!: number;
  private cacheHourDuration: number = 2; // Horas

  public searchCompleted: EventEmitter<string> = new EventEmitter();


  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<any> {
    if (this.cachedData && (Date.now() - this.cachedTimestamp < this.cacheHourDuration * 60 * 60 * 1000)) {
      console.log('data cached')
      return of(this.cachedData);
    }

    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      map(response => response.map(country => ({
        name: country.name.common,
        region: country.region,
        population: country.population,
        img: country.flags.png,
        imgAlt: country.flags.alt
      }))),
      tap(mappedResponse => {
        this.cachedData = mappedResponse;
        this.cachedTimestamp = Date.now();
        console.log('data invoked');
      })
    );
  }

  getCountryByName(name: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/name/${name}`).pipe(
tap(mappedResponse => {

        console.log(mappedResponse);
      }),
      map(response => response.map(country => ({
        name: country.name.common,
        region: country.region,
        population: country.population,
        img: country.flags.png,
        imgAlt: country.flags.alt,

        officialName: country.name.official,
        subRegion: country.subregion,
        capital: country.capital[0],
        currency: this.getCountryCurrency(country.currencies),
        languages: this.getCountryLanguages(country.languages)
      })))
      
    );
  }

  searchCountry(term: string): Country[] {
    let countriesMatchArr: any[] = [];
    term = term.toLocaleLowerCase();

    for (let _country of this.cachedData) {
      let name = _country.name.toLocaleLowerCase();

      if (name.indexOf(term) >= 0) {
        countriesMatchArr.push(_country);
      }

    }
    return countriesMatchArr;
  }

  private getCountryCurrency(currencies: any): string {
     return Object.keys(currencies)
        .map(key => `${key}: ${currencies[key].name}`)
        .join(', ');
  }

  private getCountryLanguages(languages: any): string{
    return Object.keys(languages)
        .map(key => `${languages[key]}`)
        .join(', ');
  }
}
