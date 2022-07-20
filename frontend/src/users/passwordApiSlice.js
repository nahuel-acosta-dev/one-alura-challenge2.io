import { apiSlice } from "../app/api/apiSlice";

export const passwordApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        setPassword: builder.mutation({
            query: credentials => ({
                url: `users/${credentials.id}/set_password/`,
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useSetPasswordMutation
} = passwordApiSlice;