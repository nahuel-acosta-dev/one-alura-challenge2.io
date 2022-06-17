import {createSlice} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
    name: 'auth',
    initialState:{user:null, token:null, refresh:null},
    reducers:{
        setCredentials: (state, action) => {
            const {user, token, refresh_token, access, refresh} = action.payload;
            state.user = user;
            state.token = token ? token : access;
            state.refresh = refresh_token ? refresh_token : refresh;
            localStorage.removeItem("authTokens");
            localStorage.setItem("authTokens", JSON.stringify(action.payload));
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            state.refresh = null;
            localStorage.removeItem("authTokens");
        }
    },
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;