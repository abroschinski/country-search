import CountrySummary from './Components/CountrySummary';
import CountryList from './Components/CountryList';
import React from 'react';
import SearchForm from './Components/SearchForm';
import Countries from './Models/Country';
import CountrySearchService from './Services/CountrySearchService';

import './CountrySearch.css';

export interface CountrySearchProps {
    searchService: CountrySearchService
}

interface CountrySearchState {
    userSearch: string,
    isLoading: boolean,
    errorMessage: string,
    searchResult: Countries[]|null
}

class CountrySearch extends React.Component<CountrySearchProps, CountrySearchState> {
    constructor(props: CountrySearchProps){
        super(props);
        this.state = {
            userSearch: "",
            isLoading: false,
            errorMessage: "",
            searchResult: null,
        };
    }
    
    render(){
        const {userSearch, errorMessage, isLoading, searchResult} = this.state;
        const searchField = (<SearchForm
        value = {userSearch}
        displayName = "Countries"
        inputName = "userSearch"
        inputId = "userSearch"
        errorMessage = {errorMessage}
        handleChange = {(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)}
        handleSubmit = {(event: React.FormEvent<HTMLFormElement>) => this.handleSubmit(event)}
        />);
        let resultsElements = null;
        if(isLoading){
            resultsElements = <span className="resultsMessage">Loading...</span>
        }
        else if(searchResult !== null && searchResult.length === 0){
            resultsElements = <span className="resultsMessage">No countries found.</span>
        }
        else if(searchResult !== null){
            resultsElements = (<>
            <CountryList countries = {searchResult!}/>
            <CountrySummary countries = {searchResult!}/>
            </>);
        }
        
        return (
            <div>
            {searchField}
            {resultsElements}
            </div>
        );
    }
    
    handleChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            userSearch: event.target.value,
            errorMessage: "",
        });
    }
    
    handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        
        const userSearch = this.state.userSearch;
        if(!userSearch){
            this.setState({
                errorMessage: "Please enter a search value.",
                searchResult: null
            });
            return;
        }
        
        this.setState({
            isLoading: true,
            errorMessage: ""
        });
        this.preformSearch(userSearch);
        
    }
    
    async preformSearch(userSearch: string){
        let countries;
        let errorMessage;
        try{
            const searchResult = await this.props.searchService.getCountries(userSearch);
            countries = searchResult.countries;
            errorMessage = searchResult.errorMessage;
        }
        catch(e: any){
            console.error("Error:", e);
            countries = null;
            errorMessage = "There was an error retrieving the search results. Please try again.";
        }
        this.setState({
            isLoading: false,
            searchResult: countries,
            errorMessage: errorMessage
        });
    }
}

export default CountrySearch;
