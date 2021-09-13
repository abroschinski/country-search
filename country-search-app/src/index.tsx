import React from 'react';
import ReactDOM from 'react-dom';
import CountrySearch from './CountrySearch';
import reportWebVitals from './reportWebVitals';

import {CountrySearchServiceImpl} from './Services/CountrySearchService'

ReactDOM.render(
  <React.StrictMode>
    <CountrySearch searchService={new CountrySearchServiceImpl(process.env.REACT_APP_COUNTRY_SEARCH_BASE_URL!)}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
