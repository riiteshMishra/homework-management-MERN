import { createSlice } from "@reduxjs/toolkit";

// fix: token string hai, JSON.parse ki zaroorat nahi
const token = localStorage.getItem("token");

const initialState = {
    token: token || null,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;

            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        }
    }
})

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;