import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: JSON.parse(localStorage.getItem('auth')) || {
        token: null,
        role: null,
    },

    reducers: {
        setAuth: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            localStorage.setItem('auth', JSON.stringify(state));
        },

        logout: (state) => {
            state.token = null;
            state.role = null;
            localStorage.removeItem('auth');
        }
    }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;