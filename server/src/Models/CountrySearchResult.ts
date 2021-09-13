import * as yup from 'yup';

import Country, {CountrySchema} from './Country.js'

class CountrySearchResult{
    readonly countries: Country[]|null;
    readonly errorMessage: string;
    
    constructor(
        countries: Country[]|null,
        errorMessage: string){
        this.countries = countries;
        this.errorMessage = errorMessage;
    }
}

export const CountrySearchResultSchema = yup.object().shape({
    countries: yup.array().of(CountrySchema),
    errorMessage: yup.string().required()
});

export default CountrySearchResult;
