import cors from 'cors'
import express, {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import CountrySearchController from './Controllers/CountrySearchController.js';
import {InternalCountrySearchServiceImpl} from './Services/InternalCountrySearchService.js';

const port = getIntegerConfig("PORT");
const requestMemoryMinutes = getIntegerConfig("REQUEST_MEMORY_MINUTES");
const maxRequests = getIntegerConfig("MAX_REQUESTS");
const limiter = rateLimit({
   windowMs: requestMemoryMinutes * 60 * 1000,
   max: maxRequests
});

const app = express();
const countrySearchController = new CountrySearchController(new InternalCountrySearchServiceImpl(getStringConfig("COUNTRY_SEARCH_BASE_URL")));

app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(limiter);
app.use(cors({origin: [getStringConfig("CORS_ORIGIN")]}));

app.post("/search", asyncHandler(countrySearchController.postSearch.bind(countrySearchController)));

app.listen(port, () =>{
    console.log(`server started at http://localhost:${port}`);
});

function getIntegerConfig(propertyName: string): number{
    const stringValue = process.env[propertyName];
    let result;
    
    if(stringValue){
        result = parseInt(stringValue, 10);
    }
    
    if(!result){
        throw Error(`Invalid ${propertyName} configured.`);
    }
    
    return result;
}

function getStringConfig(propertyName: string): string{
    const value = process.env[propertyName];
    if(!value){
        throw Error(`Invalid ${propertyName} configured.`);
    }
    
    return value;
}
