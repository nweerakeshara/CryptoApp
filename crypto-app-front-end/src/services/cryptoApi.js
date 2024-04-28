import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
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

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl, prepareHeaders: async (headers) => {
        const token = await getToken();
        headers.set('Authorization', `Bearer ${token}`);
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