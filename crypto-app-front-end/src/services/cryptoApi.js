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
      console.log("Dddddddd")
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
        headers.set('Authorization', `Bearer eyJ4NXQiOiJZV1kxTm1Sa1pHSTVNekU0T0RCbFpEUmlNV0k0WldKbE5qRXhaV1ZpWmpFek1tTm1ORFUzWVEiLCJraWQiOiJNV1E1TldVd1lXWmlNbU16WlRJek16ZG1NekJoTVdNNFlqUXlNalZoTldNNE5qaGtNR1JtTnpGbE1HSTNaRGxtWW1Rek5tRXlNemhoWWpCaU5tWmhZd19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwODk5ZDIzMC1jNWM3LTRhZTUtOTJkMy0xNzkzMjZiNzM0YmYiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6Ijhvb2lsU0xMdEZ3YTlUNUFBZkh6Nnd6ZlY4a2EiLCJuYmYiOjE3MTQzNTE0MzUsImF6cCI6Ijhvb2lsU0xMdEZ3YTlUNUFBZkh6Nnd6ZlY4a2EiLCJzY29wZSI6ImRlZmF1bHQiLCJvcmdhbml6YXRpb24iOnsidXVpZCI6IjUzYTZkNDBhLTIyNmUtNGNmZi05YzUxLWI1YWIzN2UzZjU5MSJ9LCJpc3MiOiJodHRwczpcL1wvc3RzLmNob3Jlby5kZXY6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNzE0MzU1MDM1LCJpYXQiOjE3MTQzNTE0MzUsImp0aSI6ImMyMzY5ODgyLTYxMjUtNDBiNC04Y2M0LTdlOTUzYTcyNWJlZCJ9.RJX0PDA-yLwWUbiU4HWuncz78G1Z9Qnc5nSalKbuAcfI0BmrmBXZuCq9RvZIyatxD9TYxLcq3PGzZKLtEC5sQxk0dqhiY6YluF27Rcx2wsd-80Kq1Au9UfBV93kcfRKxdOmkyU7byiEeeSdENzZay_cDDAvnoSoBkhxwfVXUu4sEjzZvCf8GZXjzBv-_z_MSHqy2vdyM8KrfXaMhsWRENrWSCSyzrjqEIDvR0H_1adlSo-Jylbmf9FEGfI-YYZ3UNrhMpRymaY_e-VgK4aMZx-V9xCR0nF_5uJzKX3ZF5MJLcF-ASL4TfVhAZvZEAeu8ssOyczU8B_m2kdAKBNWd-jTia3hYXdP062fDGi2-d5fZe0-NR3LenyXt6cnmpLZNuIe6VOE8g4XSMBulCaTNL_H4rdljQiER13pRhpTBs1lDKppoSqFozyt6cIxVNowqY4wXsz_5VJCi6uy5b7gYoeUSQUHIIG2fRjXhPRMq2pqHx33wu3D3SUzXYUbrEFh3GjdRo_3v0XaliwftCDZm9u82Wt_XzAua0eHWT0zvH7kOCl-3EWv-J-DiW2a1C94HreIW8cT9aPDrKT0oVUXwmfcI4LF3AaNBibqk_vsP4H2ZDzmcxl4oLW4Ty9cBWogQowM0nuX5FuGsM05TN4O8ncIcL9tuOX7m5aZ9jGq31MU`);
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