import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Replace with the actual URL of your hosted service
const baseUrl = window.configs.apiUrl;

const createRequest = (url) => (url);

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query:(count) => createRequest({url:`/coins?limit=${count}`,
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