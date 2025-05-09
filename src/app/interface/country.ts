export interface Country{
    name: string;
    region: string;
    population: string;
    img: string;
    imgAlt: string;
}

export interface CountryDetails extends Country {
    officialName: string;
    subRegion: string;
    capital: string;
    languages: string;
    currency: string;
    bonderingCountries: string;
}