import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import oauth from 'axios-oauth-client';
const axios = require('axios');


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

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl, prepareHeaders: async (headers) => {
        //const token = await getToken();
        headers.set('Authorization', `Bearer <access_token here>`);
        headers.set('accept','*/*');
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
            query:(coinId) => createRequest({url:`/crypto/details`,
            params: {                    
                coinId: coinId
            }})
        }),
        getNewBestCryptos: builder.query({
            query:() =>createRequest(`/crypto/stats`)
        }),
        getCryptoHistory: builder.query({
            query:({coinId, timePeriod}) => createRequest({
                url: `/crypto/history`,
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