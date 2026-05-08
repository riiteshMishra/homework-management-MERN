import toast from "react-hot-toast";
import apiConnector from "../apiConnector"
import { AUTH_API } from "../allEndpoints";
import { logout, setToken } from "../../toolkit/auth.slice";
import { clearUser, setUser } from "../../toolkit/user.slice";

// getErrorMessage
const getErrorMessage = (err, fallback = "Something went wrong") =>
    err?.response?.data?.message || err?.message || fallback;


// ================= SIGNUP =================
export const signup = async (formData) => {
    const toastId = toast.loading("Creating account...");
    try {
        const res = await apiConnector("POST", AUTH_API.REGISTER, formData);

        if (!res?.data?.data) {
            throw new Error("Invalid response");
        }

        toast.success("Account created successfully!");
        return res.data;
    } catch (err) {
        console.log("signup api err", err);
        toast.error(getErrorMessage(err));
    } finally {
        toast.dismiss(toastId);
    }
};


// ================= LOGIN =================
export const login = async (formData, navigate, dispatch, setBan) => {
    try {
        const res = await apiConnector("POST", AUTH_API.LOGIN, formData);

        if (!res?.data?.token) {
            throw new Error("Invalid response");
        }

        // store token
        dispatch(setToken(res.data.token));

        // store user
        if (res?.data?.user) {
            dispatch(setUser(res.data.user));
        }

        toast.success("Welcome back!");
        navigate("/dashboard/profile");

        return res.data;
    } catch (err) {
        const errMsg = getErrorMessage(err);
        if (errMsg === "This account is banned")
            setBan(true);

        toast.error(getErrorMessage(err));
    }
};


// ================= LOGOUT =================
export const logoutAccount = (dispatch, navigate) => {
    try {
        dispatch(logout());
        dispatch(clearUser());

        navigate("/");
        toast.success("Logout successful");
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
};



// ================= GET USER DETAILS =================
export const getUserDetails = async (token) => {
    try {
        const res = await apiConnector(
            "GET",
            AUTH_API.USER_DETAILS,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!res?.data?.data) {
            throw new Error("Failed to fetch user details");
        }

        return res.data.data;
    } catch (err) {
        console.log("GET_USER_DETAILS ERROR:", err);
        toast.error(getErrorMessage(err));
    }
};


// ================= GET ALL STUDENTS =================
export const getAllStudents = async (token) => {
    try {
        const res = await apiConnector(
            "GET",
            AUTH_API.ALL_STUDENTS,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!res?.data?.data) {
            throw new Error("Failed to fetch students");
        }

        return res.data.data;
    } catch (err) {
        console.log("GET_ALL_STUDENTS ERROR:", err);
        toast.error(getErrorMessage(err));
    }
};