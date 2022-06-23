import { apiSlice } from "../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => 'hangman/api/words/',
            keepUnusedDataFor: 5,//no se si es necesario poner esto
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice;