import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const axios = require('axios');

//From Choreo
async function getToken() {
    try {
        const response = await axios.post('https://api.asgardeo.io/t/clarindatechnologies/oauth2/token', 
            'grant_type=client_credentials',
            {
                headers: {
                    'Authorization': 'Basic elR6MWZxb3A0WnJZMW5LZjlwYnJkX0NxZGw4YTp1XzdqSjhOMnVxNjlBRUtiVWdVTlZNaHhWX1VHQWZNbGpZc2Y5aEhpVFhBYQ==',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'paf=1714286654.104.263.563063|71acb898e1e9604d7bd8c41e308eb24e'
                }
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting token', error);
        throw error;
    }
}
const baseUrl = 'https://53a6d40a-226e-4cff-9c51-b5ab37e3f591-prod.e1-us-cdp-2.choreoapis.dev/crypto-application/crypto-application-service/cryptoapp-endpoints-5c6/v1';

const createRequest = (url) => (url);

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl, prepareHeaders: async (headers) => {
        const token = await getToken();
        headers.set('Authorization', `Bearer ${token}`);
        return headers;
    }}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query:(count) => createRequest({url:`/crypto`,
            params: {                    
                count: count
            }})
        }),
        getCryptoDetails: builder.query({
            query:(coinId) => createRequest({url:`/details`,
            params: {                    
                coinId: coinId
            }})
        }),
        getNewBestCryptos: builder.query({
            query:() =>createRequest(`/stats`)
        }),
        getCryptoHistory: builder.query({
            query:({coinId, timePeriod}) => createRequest({
                url: `/history`,
                params: {                    
                    timePeriod: timePeriod ||'24h',
                    coinId : coinId
                }
            })
        })
    }) 
});
 
export const {
    useGetCryptosQuery, /* Add "USE" to front, then getCryptos which is name from above, then at end "Query" */
    useGetCryptoDetailsQuery,
    useGetNewBestCryptosQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;

// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/exchanges',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       limit: '50',
//       offset: '0',
//       orderBy: '24hVolume',
//       orderDirection: 'desc'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'b0fb817316mshcb98dc62348376fp14cce2jsn18eddc099c3c',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };
  
//   try {
//       const response = await axios.request(options);
//       console.log(response.data);
//   } catch (error) {
//       console.error(error);
//   }