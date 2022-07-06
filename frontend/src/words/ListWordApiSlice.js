import { apiSlice } from "../app/api/apiSlice";

export const listWordsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listWords: builder.query({
            query: () => '/words',
            keepUnusedDataFor: 5,
        })
    })
})
export const {
    useListWordsQuery
} = listWordsApiSlice;