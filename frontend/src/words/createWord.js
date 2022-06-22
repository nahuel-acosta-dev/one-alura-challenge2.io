import { apiSlice } from "../../app/api/apiSlice";

export const wordsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createWord: builder.mutation({
            query: credentials => ({
                url: 'words/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useCreateWordMutation
} = wordsApiSlice;