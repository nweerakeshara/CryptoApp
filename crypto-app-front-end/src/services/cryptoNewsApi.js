import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import reqmate from 'reqmate';

//From Choreo
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
const tokenUrl = window?.configs?.tokenUrl ? window.configs.tokenUrl : "/";
const postData = {
    grant_type: 'client_credentials',
};
// Encode the data in application/x-www-form-urlencoded format
const encodedData = new URLSearchParams(postData).toString();
const response = await reqmate
    .post(tokenUrl, { body: encodedData })
    .setCaching(500000)
    .send();

//From Choreo
const baseUrl = apiUrl;
const headers = {
    'accept': '*/*',
    'Authorization': `Bearer ${response.access_token}`
}

const createRequest = (url) => (url);

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl, headers }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ time }) => createRequest({
                url: '/news',
                params: {
                    time: time || 'w'
                }
            })
        })
    })
});

export const {
    useGetCryptoNewsQuery, /* Add "USE" to front, then getCryptoNews which is name from above, then at end "Query" */
} = cryptoNewsApi;

// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://duckduckgo10.p.rapidapi.com/search/news',
//   params: {
//     safeSearch: 'off',
//     term: 'crypto',
//     region: 'wt-wt',
//     time: 'a',
//     offset: '5'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'b0fb817316mshcb98dc62348376fp14cce2jsn18eddc099c3c',
//     'X-RapidAPI-Host': 'duckduckgo10.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }