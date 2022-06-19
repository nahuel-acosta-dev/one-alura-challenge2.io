import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState:{user:null, token:null, refresh:null},
    reducers:{
        setCredentials: (state, action) => {
            const {user, token, refresh_token, access, refresh} = action.payload;
            state.user = user;
            state.token = token ? token : access;
            state.refresh = refresh_token ? refresh_token : refresh;
            //estos ultimos 2 moverlos para que se apliquen en la pantalla que se inicia session
            //despues de haber recibido el mensaje de aprobacion creo que seria lo mas correcto
            localStorage.removeItem("authTokens");
            localStorage.setItem("authTokens", JSON.stringify(action.payload));
        },
        logOut: (state, action) => {
            //falta configurar una llamada a la api Logout
            state.user = null;
            state.token = null;
            state.refresh = null;
            //localStorage.removeItem("authTokens");
            localStorage.clear();
        }
    },
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;