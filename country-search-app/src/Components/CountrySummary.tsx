import React from 'react'
import LabeledDetail from './LabeledDetail'
import Country from '../Models/Country'
 
import './CountrySummary.css'
 
export interface CountrySummaryProps {
     countries: Country[]
}
 
function CountrySummary({countries}: CountrySummaryProps){
    const regionCounts = countries.map(country => country.region).reduce(instanceCountingReducer, new Map());
    const subregionCounts = countries.map(country => country.subregion).reduce(instanceCountingReducer, new Map());
     return (
         <div className="summary">
            <div className="heading">
            <LabeledDetail detailId="TotalCountries" labelName="Total Countries:">
            {countries.length}
            </LabeledDetail>
            </div>
            <div className="heading">
            <LabeledDetail detailId="SeenRegions" labelName="Region:">
                <ul className="regionList">
                    {Array.from(regionCounts).map(regionCount => instanceCountRenderer(regionCount))}
                </ul>
            </LabeledDetail>
            </div>
            <div className="heading">
            <LabeledDetail detailId="SeenSubregions" labelName="Subregion:">
                <ul className="regionList">
                    {Array.from(subregionCounts).map(subregionCount => instanceCountRenderer(subregionCount))}
                </ul>
            </LabeledDetail>
            </div>
         </div>
     );
}

/**
 * Count the number of times a string appears in the list.
 * Requires an inital map be passed in.
 */
function instanceCountingReducer(previousValue: Map<string, number>, currentValue: string, currentIndex: number, array: string[]): Map<string, number>{
    const currentCount = previousValue.get(currentValue);
    var nextCount;
    
    if(currentCount !== undefined){
        nextCount = currentCount + 1;
    } 
    else {
        nextCount = 1;
    }
    
    previousValue.set(currentValue, nextCount);
    return previousValue;
}

function instanceCountRenderer(pair: [string, number]){
    const instance = pair[0];
    const count = pair[1];
    return (
        <li key={instance}>
            <LabeledDetail detailId={instance} labelName={instance + ":"}>
            {count}
            </LabeledDetail>
        </li>
    );          
}
 
export default CountrySummary;
