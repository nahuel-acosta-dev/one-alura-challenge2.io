import { apiSlice } from "../../app/api/apiSlice";

export const logoutApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        logout: builder.mutation({
            query: credentials => ({
                url: 'auth/logout/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useLogoutMutation
} = logoutApiSlice;