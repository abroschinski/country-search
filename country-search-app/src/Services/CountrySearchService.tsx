import 'whatwg-fetch'
import 'url-search-params-polyfill'

import CountrySearchResult, {CountrySearchResultSchema} from '../Models/CountrySearchResult'

interface CountrySearchService{
    getCountries: (searchString: string) => Promise<CountrySearchResult>
}

export class CountrySearchServiceImpl implements CountrySearchService{
    private readonly _errorResult = new CountrySearchResult(null, "There was an error retrieving the search results. Please try again.")
    constructor(private _baseUrl: string){ }
    
    /**
     * Get the countries that match the given search string.
     * Returns a CountrySearchResult which also contains any
     * error messages sent by or caused by the server.
     */
    async getCountries(searchString: string): Promise<CountrySearchResult>{
        // We have to use URLSearchParams to encode the data from the fields
        // because FormData causes fetch to assume that we are sending
        // a multipart form.
        const data = new URLSearchParams();
        
        // To protect against an csrf attack when in an environment with 
        // stored session data put the csrf token in this post.
        data.append("userSearch", searchString);
        
        const response = await fetch(this._baseUrl + "/search", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
        
        if(!response.ok){
            console.error("Server Error:", response.status);
            return this._errorResult;
        }
        
        const resultJson = await response.json();
        const result = JSON.parse(resultJson);
        
        let validResult = await CountrySearchResultSchema.isValid(result);
        
        if(!validResult){
            console.error("Invalid Json response.", resultJson)
            return this._errorResult;
        }
        
        return result as CountrySearchResult;
    }
}

export default CountrySearchService
