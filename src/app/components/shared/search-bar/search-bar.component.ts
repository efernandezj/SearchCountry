import { Component, EventEmitter, Output } from '@angular/core';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  
  constructor(private countryService: CountryService) {  }


  public searchCountry(term: string): void {
    this.countryService.searchCompleted.emit(term.toLocaleLowerCase());
  }

}
