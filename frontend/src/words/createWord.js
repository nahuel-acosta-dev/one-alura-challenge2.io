import { apiSlice } from "../../app/api/apiSlice";
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
const user = useSelector(selectCurrentUser);

export const wordsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createWord: builder.mutation({
            query: credentials => ({
                url: 'words/',
                method: 'POST',
                body: { 
                    'user': user.id,
                    ...credentials }
            })
        }),
    })
})

export const {
    useCreateWordMutation
} = wordsApiSlice;
