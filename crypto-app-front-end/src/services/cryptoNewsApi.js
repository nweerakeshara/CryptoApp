import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import oauth from 'axios-oauth-client';
const axios = require('axios');

//From Choreo
//From Choreo
async function getToken() {
    const getClientCredentials = oauth.clientCredentials(
        axios.create(),
        `<token url>`,
        `<Consumer Key>`,
        `<Consumer Secret>`
    );
    const auth = await getClientCredentials();
    console.log(auth)
    const accessToken = auth.access_token;
    return accessToken;
}
const baseUrl = 'https://53a6d40a-226e-4cff-9c51-b5ab37e3f591-dev.e1-us-cdp-2.choreoapis.dev/crypto-application/crypto-application-service/cryptoapp-endpoints-5c6/v1';

const createRequest = (url) => (url);

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl, prepareHeaders: async (headers) => {
            //const token = await getToken();
            headers.set('Authorization', `Bearer <access_token here>`);
            headers.set('accept', '*/*');
            return headers;
        }
    }),
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