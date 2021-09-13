import * as yup from 'yup';

import Country, {CountrySchema} from './Country'

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

/**
 * The schema for a valid country search result.
 */
export const CountrySearchResultSchema = yup.object().shape({
    countries: yup.array().nullable().defined().of(CountrySchema),
    errorMessage: yup.string().nullable()
});

export default CountrySearchResult;
