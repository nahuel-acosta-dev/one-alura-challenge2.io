import { apiSlice } from "../app/api/apiSlice";

export const getWordLastApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        wordLast: builder.query({
            query: () => '/words/last',
            keepUnusedDataFor: 5,
        })
    })
})
export const {
    useWordLastQuery
} = getWordLastApiSlice;