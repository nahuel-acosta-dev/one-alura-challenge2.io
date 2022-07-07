import { apiSlice } from "../app/api/apiSlice";

export const getRoomApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoom: builder.query({
            query: () => '/room/activated',
            keepUnusedDataFor: 5,
        })
    })
})
export const {
    useGetRoomQuery
} = getRoomApiSlice;