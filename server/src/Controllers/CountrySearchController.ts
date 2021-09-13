import {Request, Response} from 'express';

import Country from '../Models/Country.js';
import CountrySearchResult from '../Models/CountrySearchResult.js';
import CountrySearchRequestBody from '../Models/CountrySearchRequestBody.js';
import InternalCountrySearchService from '../Services/InternalCountrySearchService.js';
import validateRequest from '../Validators/SearchRequestValidator.js';

/**
 * Handles country searches.
 * The countrySearchService passed in actually retrieves
 * the countries from backing api.
 */
class CountrySearchController{
    private readonly _countrySearchService;
    private readonly _errorMessage = "There was an error retrieving the search results. Please try again."
    
    constructor(countrySearchService: InternalCountrySearchService){
        this._countrySearchService = countrySearchService;
    }
    
    async postSearch(req: Request, res: Response){
        const {isValid, errorMessage} = await validateRequest(req.body);
        
        if(!isValid){
            console.error
            res.json(JSON.stringify(new CountrySearchResult(null, errorMessage)));
            return;
        }
        
        const body = req.body as CountrySearchRequestBody;
        
        let countries: Country[]|null;
        try{
            countries = await this._countrySearchService.getCountries(body.userSearch);
        }
        catch(e){
            console.error(`Error retrieving countries:`, e);
            countries = null;
            return;
        }
        
        if(countries === null){
            res.json(JSON.stringify(new CountrySearchResult(null, this._errorMessage)));
            return;
        }
        
        const seenCountries = new Set()
        const cleanedCountries = countries.filter(country => {
            if(seenCountries.has(country.alphaCode2))
            { 
                return false; 
            }
            else
            {
                seenCountries.add(country.alphaCode2);
                return true;
            }   
        }).sort((country1, country2) =>{
            return country2.population - country1.population;
        })
        
        res.json(JSON.stringify(new CountrySearchResult(cleanedCountries, "")));
    }
}

export default CountrySearchController;
