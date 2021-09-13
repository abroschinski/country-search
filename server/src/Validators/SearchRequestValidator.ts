import * as yup from 'yup';
import ValidationResult from '../Models/ValidationResult.js';

import CountrySearchRequestBody, {CountrySearchRequestBodySchema} from '../Models/CountrySearchRequestBody.js';

/**
 * Validates a country search request.
 */
async function validateRequest(body: any): Promise<ValidationResult> {
    // Combining these two checks leads to more unreadable code.
    // Or something that quits early and doesn't validate the request.
    if(!body){
        return new ValidationResult(false, "The search request was invalid.");
    }
    
    if(!await CountrySearchRequestBodySchema.isValid(body)){
        return new ValidationResult(false, "The search request was invalid.");
    }
    return new ValidationResult(true);
}

export default validateRequest;
