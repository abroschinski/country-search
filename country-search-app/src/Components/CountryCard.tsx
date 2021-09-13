import React from 'react';
import LabeledDetail from './LabeledDetail'

import './CountryCard.css';

export interface CountryCardProps {
    name: string,
    alphaCode2: string,
    alphaCode3: string,
    flagUrl: string,
    region: string,
    subregion: string,
    population: number,
    languages: string[],
}


function CountryCard(props: CountryCardProps){
    return (
        <div className="card">
            <div className="container">
                <h1 className="countryTitle">
                    {props.name}
                    <img src={props.flagUrl.toString()} alt={`${props.name} Flag`}/>
                </h1>
                <div className="countryPopulation">
                    <LabeledDetail 
                    detailId = "population"
                    labelName = "Population:">
                        <span>{props.population}</span>
                    </LabeledDetail>
                </div>
                <div>
                    <LabeledDetail 
                    detailId = "alphaCode2"
                    labelName = "Alpha Code 2:">
                        <span>{props.alphaCode2}</span>
                    </LabeledDetail>
                    <LabeledDetail 
                    detailId = "alphaCode3"
                    labelName = "Alpha Code 3:">
                        <span>{props.alphaCode3}</span>
                    </LabeledDetail>
                </div>
                <div>
                    <LabeledDetail 
                    detailId = "region"
                    labelName = "Region:">
                        <span>{props.region}</span>
                    </LabeledDetail>
                    <LabeledDetail 
                    detailId = "subregion"
                    labelName = "Subregion:">
                        <span>{props.subregion}</span>
                    </LabeledDetail>
                </div>
                <div>
                <LabeledDetail 
                detailId = "languages"
                labelName = "Languages:">
                    <ul className="languageList">
                        {props.languages.map((lang) => renderLanguage(lang))}
                    </ul>
                </LabeledDetail>
                </div>
            </div>
        </div>
    );
}

function renderLanguage(language: string){
    return <li key={language}>
    {language}
    </li>
}

export default CountryCard

