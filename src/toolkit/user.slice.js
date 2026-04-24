import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem('user');

const initialState = {
    user: userData ? JSON.parse(userData) : null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;

            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        clearUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    }
})

// fix: export missing tha
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;