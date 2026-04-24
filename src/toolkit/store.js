import { configureStore } from "@reduxjs/toolkit"; // fix: 
import authReducer from "../toolkit/auth.slice"
import userReducer from "../toolkit/user.slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    }
})

export default store;