import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState:{user:null, token:null, refresh:null},
    reducers:{
        setCredentials: (state, action) => {
            const {user, token, refresh_token, access, refresh} = action.payload;
            console.log(action.payload)
            state.user = user
            state.token = token ? token : access
            state.refresh = refresh_token ? refresh_token : refresh
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
        }
    },
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;