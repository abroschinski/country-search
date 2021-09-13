import * as yup from 'yup';

class Country {
    readonly name: string;
    readonly alphaCode2: string;
    readonly alphaCode3: string;
    readonly flagUrl: string;
    readonly region: string;
    readonly subregion: string;
    readonly population: number;
    readonly languages: string[];
    
    constructor(
        name:string,
        alphaCode2:string,
        alphaCode3:string,
        flagUrl: string,
        region: string,
        subregion: string,
        population: number,
        languages: string[]
    ){
        this.name = name;
        this.alphaCode2 = alphaCode2;
        this.alphaCode3 = alphaCode3;
        this.flagUrl = flagUrl;
        this.region = region;
        this.subregion = subregion;
        this.population = population;
        this.languages = languages;
    }
}

/**
 * The schema for a valid country.
 * Use after replacing any empty regions/subregions with none.
 */
export const CountrySchema = yup.object().shape({
    name: yup.string().required(),
    alphaCode2: yup.string().required(),
    alphaCode3: yup.string().required(),
    flagUrl: yup.string().required().url(), // The browser filters out non-images so lets just make sure it's a url.
    region: yup.string().required(),
    subregion: yup.string().required(),
    population: yup.number().required().min(0).integer(), // Can be zero.
    languages: yup.array().of(yup.string().required())
});

export default Country;
