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
            //const token = await getToken();
            headers.set('Authorization', `Bearer eyJ4NXQiOiJZV1kxTm1Sa1pHSTVNekU0T0RCbFpEUmlNV0k0WldKbE5qRXhaV1ZpWmpFek1tTm1ORFUzWVEiLCJraWQiOiJNV1E1TldVd1lXWmlNbU16WlRJek16ZG1NekJoTVdNNFlqUXlNalZoTldNNE5qaGtNR1JtTnpGbE1HSTNaRGxtWW1Rek5tRXlNemhoWWpCaU5tWmhZd19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwODk5ZDIzMC1jNWM3LTRhZTUtOTJkMy0xNzkzMjZiNzM0YmYiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6Ijhvb2lsU0xMdEZ3YTlUNUFBZkh6Nnd6ZlY4a2EiLCJuYmYiOjE3MTQzNTA3MjAsImF6cCI6Ijhvb2lsU0xMdEZ3YTlUNUFBZkh6Nnd6ZlY4a2EiLCJzY29wZSI6ImRlZmF1bHQiLCJvcmdhbml6YXRpb24iOnsidXVpZCI6IjUzYTZkNDBhLTIyNmUtNGNmZi05YzUxLWI1YWIzN2UzZjU5MSJ9LCJpc3MiOiJodHRwczpcL1wvc3RzLmNob3Jlby5kZXY6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNzE0MzU0MzIwLCJpYXQiOjE3MTQzNTA3MjAsImp0aSI6IjNlZDg1OGJjLTZjZDgtNDJhNi1hNGRiLWJiZTYyNGM5NDVmMSJ9.n9uEsnQGBtzIv1dO7IreVIgPu0sXYprEMiFn1ZgeqX3dlVqvKVBvGIxmGP2YXrFBSKAohFtEAaFjtgrSOXm8psGWFp1oS_bdaSsPJKEhfoIkxNmCiO_6PwKBd2AJIMiTOZZP1vIBlIaZQBjerZZg6e6KG4SChwtEsZ88lTO43pUruM7l9HWHfAkMy2_YA3G-MSYhLUT6n0_Umqs6b_88wv8z4_OUusDycD1kOO3dlfriwOu5zPDXyyIx1UlTDMgcwJPp-JaowK8za-7DD88BYLMgj6N-tJbttD1fc1Fqp4dw82e1VAS_ESPenQZb3Tigboc7Lh7B2YzMPj3KRYJkA2jo4iu6lIbIS9cSRLRYpHhh6mTr5MmVMkTigFErbNn-UxYC9EsCBqzyo7sLbnZGjs-klajux_Lysb1hvFPniiOPrzolKPH9QO9jgXtVAh6CDAV0r0y2qNUS_Y9YN9pQwvpkjTliFM3_DY66eX1W5mSGlUy32Ydk8p0B9lOL_HLzw9mukaZq6v8Oj4ITX8vtQlqlnRN5PYabowG9NuJ6-CqK9W3fF2V1boQh4LZB_q19WVrdA17dDnJ4F_hrkjqdx1kqPBn4t53SxqoIMrr1HjSHt1Qyj6cZub0wF3EQ73bI6u35U4VY9sHqTCoU3hC21b8c-8u9RnSDgISO7LYN-7Q`);
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