import { apiSlice } from "../app/api/apiSlice";

export const profilesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfiles: builder.query({
            query: () => '/profile',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetProfilesQuery
} = profilesApiSlice;