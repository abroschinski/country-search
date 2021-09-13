import * as yup from 'yup';

class CountrySearchRequestBody{
    userSearch: string = "";
}

export const CountrySearchRequestBodySchema = yup.object().shape({
    userSearch: yup.string().required()
});

export default CountrySearchRequestBody;
