import Country from '../Models/Country.js';

/**
 * Creates a possibly invalid Country object from any source.
 * Verify it is a conforming Country before using.
 */
function createCountry(source: any){
    const languages: string[] = [];
    if(source.languages && Array.isArray(source.languages)){
        // Pick out the probable language names and then remove
        // all of the falsy ones. We'll validate the actual
        // content later.
        languages.push(...(source.languages as any[]).map(lang => lang.name).filter(lang => lang));
    }
    
    // Region and subregion can be empty strings for some countries.
    // So lets replace them with null while not causing the country
    // to become valid otherwise.
    let region;
    if(source.region === ''){
        region = 'None';
    }
    else{
        region = source.region;
    }
    
    let subregion;
    if(source.subregion === ''){
        subregion = 'None';
    }
    else{
        subregion = source.subregion;
    }
    
    return new Country(
        source.name,
        source.alpha2Code,
        source.alpha3Code,
        source.flag,
        region,
        subregion,
        source.population,
        languages);
}

export default createCountry;
