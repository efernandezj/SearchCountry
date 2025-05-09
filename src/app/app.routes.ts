import { Routes } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { CountryComponent } from './components/shared/country/country.component';
import { CountryDetailsComponent } from './components/shared/country-details/country-details.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'country/:name', component: CountryDetailsComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
