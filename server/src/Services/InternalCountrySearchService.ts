import * as yup from 'yup';
// This doesn't like being imported without type: module in the packages.json file
// Which caused other problems... Leading to this mouse getting extensions on all 
// custom modules and a runtime warning.
import fetch, {Response} from 'node-fetch'; 
import AbortController from 'abort-controller';

import createCountry from '../Factories/CountryFactory.js';
import Country, {CountrySchema} from '../Models/Country.js';
import CountrySearchResult from '../Models/CountrySearchResult.js';


interface InternalCountrySearchService{
    getCountries: (searchString: string) => Promise<Country[]|null>
}

export class InternalCountrySearchServiceImpl implements InternalCountrySearchService{
    private readonly _baseUrl: string;
    private readonly _fieldFilter = "fields=name;alpha2Code;alpha3Code;region;subregion;population;languages;flag;";
    
    constructor(baseUrl: string){
        this._baseUrl = baseUrl;
    }
    
    /**
     * Get the countries that match the given search string.
     * Any errors from the server are logged and a null result is returned.
     */
    async getCountries(searchString: string): Promise<Country[]|null>{
        const encodedSearchString = encodeURIComponent(searchString);
        const controller = new AbortController();
        const timeout = setTimeout(()=> {
            controller.abort();
        }, 3000);
        try {
            const nameSearchPromise = fetch(`${this._baseUrl}/name/${encodedSearchString}?${this._fieldFilter}`, {signal: controller.signal});
            const fullNameSearchPromise = fetch(`${this._baseUrl}/name/${encodedSearchString}?fullText=true&${this._fieldFilter}`, {signal: controller.signal});
            
            // The alpha codes use ASCII characters which will not be expanded during
            // the URI encoding. So to make sure we don't cause problems for the remote
            // api lets make sure non-ascii characters are encoded first.
            let codeSearchPromise: Promise<Response>|null = null;
            if(encodedSearchString.length === 2 || encodedSearchString.length === 3){
                codeSearchPromise = fetch(`${this._baseUrl}/alpha/${encodedSearchString}?${this._fieldFilter}`,  {signal: controller.signal});
            }
            
            let nameSearchResponse: Response;
            let fullNameSearchResponse: Response;
            let codeSearchResponse: Response|null = null;
            
            // Promise all requires that all complete successfuly. Since we are contacting
            // the same server if one fails all will likely fail so this is ok.
            if(codeSearchPromise !== null){
                const results = await Promise.all([nameSearchPromise, fullNameSearchPromise, codeSearchPromise]);
                nameSearchResponse = results[0];
                fullNameSearchResponse = results[1];
                codeSearchResponse = results[2];
            }
            else{
                const results = await Promise.all([nameSearchPromise, fullNameSearchPromise]);
                nameSearchResponse = results[0];
                fullNameSearchResponse = results[1];
            }
            
            if(!this.responseIsValid(nameSearchResponse)
                || !this.responseIsValid(fullNameSearchResponse)
                || (codeSearchResponse !== null && !this.responseIsValid(codeSearchResponse))){
                return null;
            }
            
            let potentialCountries: any[] = []; 
            if(nameSearchResponse.status !== NO_RESULTS_STATUS){
                potentialCountries.push(...this.convertToArray(await nameSearchResponse.json()));
            }
            
            if(fullNameSearchResponse.status !== NO_RESULTS_STATUS){
                potentialCountries.push(...this.convertToArray(await fullNameSearchResponse.json()));
            }
            
            if(codeSearchResponse !== null && codeSearchResponse.status !== NO_RESULTS_STATUS){
                potentialCountries.push(...this.convertToArray(await codeSearchResponse.json()));
            }
            
            const unsafeCountries = potentialCountries.map(country => createCountry(country))
            let validCountries = true;
            for(let country of unsafeCountries){
                if(!await CountrySchema.isValid(country)){
                    validCountries = false;
                }
            }
            
            if(await yup.array().of(CountrySchema).isValid(unsafeCountries)){
                return unsafeCountries as Country[];
            }
            
            return null;
            
        }
        catch (e){
            console.error(e);
            return null;
        }
        finally{
            clearTimeout(timeout);
        }
    }
    
    /**
     * Return if the response has an OK status, or is a NO_RESULTS_STATUS, i.e. 404.
     * Both of which are valid responses to a query.
     */
    private responseIsValid(response: Response) {
        return response.ok || response.status === NO_RESULTS_STATUS;
    }
    
    /**
     * Put what ever is passed in into an array unless it is already an array.
     */
    private convertToArray(responseJson: any): any[]{
        if(Array.isArray(responseJson)){
            return  responseJson;
        }
        else{
            return [responseJson];
        }
    }
}

const NO_RESULTS_STATUS = 404;

export default InternalCountrySearchService;
