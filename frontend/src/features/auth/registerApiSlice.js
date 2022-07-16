import { apiSlice } from "../../app/api/apiSlice";

export const registerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: 'auth/register/',
                method: 'POST',
                body: {...credentials }
            })
        }),
    })
})

export const {
    useRegisterMutation
} = registerApiSlice;