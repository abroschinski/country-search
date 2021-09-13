import React from 'react';

import './SearchForm.css'

export interface SearchFormProps {
    value: string,
    displayName: string
    inputName: string,
    inputId: string,
    errorMessage: string,
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    handleSubmit: React.FormEventHandler<HTMLFormElement>
}

function SearchForm({value,
                     displayName,
                     inputName,
                     inputId,
                     errorMessage,
                     handleChange,
                     handleSubmit,
}: SearchFormProps) {
    return (
        <div className="searchForm">
            <form onSubmit={handleSubmit}>
                <input type="text" name={inputName} id={inputId} value={value} onChange={handleChange} placeholder={displayName}/>
                {/* To protect again csrf attacks add a hidden input here to contain the token.*/}
                <input type="submit" value="Submit"/>
            </form>
            <span className="errorMessage">{errorMessage}</span>
        </div>
    );
}

export default SearchForm;

