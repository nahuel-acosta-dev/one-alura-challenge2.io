import { apiSlice } from "../app/api/apiSlice";
export const updateRoomApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateRoom: builder.mutation({
            query: (credentials) => {
                console.log(credentials)
                //el segundo argumento nunca se carga no entiendo el motivo
                return ({
                url: `/room/${credentials.id}/`,
                method: 'PUT',
                body:  {...credentials },
            })}
        }),
    })
})

/*export const updateRoomApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateRoom: builder.mutation({
            query(data) {
                console.log(data)
                const {body, id} = data;
                console.log(body)
                console.log(id)
                return {
                url: `/room/${id}/`,
                method: 'PUT',
                body,
            }},
        }),
    })
})*/

export const {
    useUpdateRoomMutation
} = updateRoomApiSlice;