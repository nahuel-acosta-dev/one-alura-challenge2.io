import { apiSlice } from "../../app/api/apiSlice";

export const notificationsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.query({
            query: () => '/invitations',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetNotificationsQuery
} = notificationsApiSlice;