import { apiSlice } from "../../app/api/apiSlice";

export const notificationsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        notifications: builder.query({
            query: () => '/notifications',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetNotificationsQuery
} = notificationsApiSlice;