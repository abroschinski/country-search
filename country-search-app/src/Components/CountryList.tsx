import React from 'react';
import CountryCard from './CountryCard'
import Country from '../Models/Country'

import './CountryList.css'

export interface CountryListProps {
    countries: Country[]
}

function CountryList({countries}: CountryListProps) {
    const countryCards = countries.map((country) => <li key={country.name} className="countryCard">
                    <CountryCard
                        name={country.name}
                        alphaCode2={country.alphaCode2}
                        alphaCode3={country.alphaCode3}
                        flagUrl={country.flagUrl}
                        region={country.region}
                        subregion={country.subregion}
                        population={country.population}
                        languages={country.languages}
                    />
                </li>
            );
    return (
        <ol className="countryList">
            {countryCards}
        </ol>
    );
}

export default CountryList;
