import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    'X-RapidAPI-Key': 'b0fb817316mshcb98dc62348376fp14cce2jsn18eddc099c3c',
    'X-RapidAPI-Host': 'duckduckgo10.p.rapidapi.com'
}

const baseUrl = 'https://duckduckgo10.p.rapidapi.com';

const createRequest = (url) => (url);

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl, headers }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ time }) => createRequest({
                url: '/search/news',
                params: {                    
                    term: 'crypto',
                    safeSearch: 'off',
                    region: 'wt-wt',
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