import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
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
    .post(tokenUrl, { body: encodedData})
    .setCaching(500000) 
    .send();

//From Choreo
const baseUrl = apiUrl;
const headers = {
    'accept': '*/*',
    'Authorization': `Bearer ${response.access_token}`
}


const createRequest = (url) => (url);

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl, headers}),
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