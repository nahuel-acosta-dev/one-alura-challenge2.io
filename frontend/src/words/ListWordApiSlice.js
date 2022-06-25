import { apiSlice } from "../app/api/apiSlice";

export const listWordsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listWords: builder.query({
            query: () => '/words',
            keepUnusedDataFor: 5,//no se si es necesario poner esto
        })
    })
})
export const {
    useListWordsQuery
} = listWordsApiSlice;