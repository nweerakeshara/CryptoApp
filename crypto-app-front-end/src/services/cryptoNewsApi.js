import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import oauth from 'axios-oauth-client';
const axios = require('axios');

//From Choreo
async function getToken() {
    const getClientCredentials = oauth.clientCredentials(
        axios.create(),
        `https://api.asgardeo.io/t/clarindatechnologies/oauth2/token`,
        `zTz1fqop4ZrY1nKf9pbrd_Cqdl8a`,
        `u_7jJ8N2uq69AEKbUgUNVMhxV_UGAfMljYsf9hHiTXAa`
      );
      const auth = await getClientCredentials();
      const accessToken = auth.access_token;
      return accessToken;
}
const baseUrl = '/choreo-apis/crypto-application/crypto-application-service/cryptoapp-endpoints-5c6/v1.0';


const createRequest = (url) => (url);

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl, prepareHeaders: async (headers) => {
            const token = await getToken();
            headers.set('Authorization', `Bearer ${token}`);
            headers.set('accept','*/*');
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