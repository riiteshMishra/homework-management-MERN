import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { HOMEWORK_API } from "../allEndpoints";

// getErrorMessage
const getErrorMessage = (err, fallback = "Something went wrong") =>
    err?.response?.data?.message || err?.message || fallback;


// ================== CREATE HOMEWORK ==================
export const createHomework = async (data, token) => {
    const toastId = toast.loading("Creating homework...");
    try {
        const res = await apiConnector(
            "POST",
            HOMEWORK_API.CREATE_HOMEWORK,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if (!res?.data?.success) {
            throw new Error("Failed to create homework");
        }

        toast.success("Homework created successfully!");
        return res.data;
    } catch (err) {
        console.log("CREATE_HOMEWORK ERROR:", err);
        toast.error(getErrorMessage(err));
    } finally {
        toast.dismiss(toastId);
    }
};


// ================== UPDATE HOMEWORK ==================
export const updateHomework = async (data, token, navigate) => {
    const toastId = toast.loading("Updating homework...");
    try {
        const res = await apiConnector(
            "PATCH",
            HOMEWORK_API.UPDATE_HOMEWORK,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!res?.data?.success) {
            throw new Error("Failed to update homework");
        }

        toast.success("Homework updated successfully!");
        navigate("/dashboard/homeworks/all")
        return res.data;
    } catch (err) {
        console.log("UPDATE_HOMEWORK ERROR:", err);
        toast.error(getErrorMessage(err));
    } finally {
        toast.dismiss(toastId);
    }
};


// ================== DELETE HOMEWORK ==================
export const deleteHomework = async (homeworkId, token) => {
    const toastId = toast.loading("Deleting homework...");
    try {
        const url = HOMEWORK_API.DELETE_HOMEWORK.replace(":homeworkId", homeworkId);

        const res = await apiConnector(
            "DELETE",
            url,
            null,
            {
                Authorization: `Bearer ${token}`, // ✅ added
            }
        );

        if (!res?.data?.success) {
            throw new Error("Failed to delete homework");
        }

        toast.success("Homework deleted successfully!");
        return res.data;
    } catch (err) {
        console.log("DELETE_HOMEWORK ERROR:", err);
        toast.error(getErrorMessage(err));
    } finally {
        toast.dismiss(toastId);
    }
};


// ================== GET ALL HOMEWORKS ==================
export const getAllHomeworks = async (token) => {
    try {
        const res = await apiConnector(
            "GET",
            HOMEWORK_API.ALL_HOMEWORKS,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!res?.data?.success) {
            throw new Error("Failed to fetch homeworks");
        }

        return res.data.data;
    } catch (err) {
        console.log("GET_ALL_HOMEWORKS ERROR:", err);
        toast.error(getErrorMessage(err));
    }
};


// ================== GET HOMEWORK BY ID ==================
export const getHomeworkById = async (homeworkId, token) => {
    try {
        const url = HOMEWORK_API.HOMEWORK_BY_ID.replace(":homeworkId", homeworkId);

        const res = await apiConnector(
            "GET",
            url,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!res?.data?.success) {
            throw new Error("Failed to fetch homework");
        }

        return res.data.data;
    } catch (err) {
        console.log("GET_HOMEWORK_BY_ID ERROR:", err);
        toast.error(getErrorMessage(err));
    }
};


// ================== SUBMIT HOMEWORK ==================
export const submitHomework = async (data, token) => {
    const toastId = toast.loading("Submitting homework...");
    try {
        const res = await apiConnector(
            "POST",
            HOMEWORK_API.SUBMIT_HOMEWORK,
            data,
            {
                Authorization: `Bearer ${token}`, // ✅ added
            }
        );

        if (!res?.data?.success) {
            throw new Error("Submission failed");
        }

        toast.success("Homework submitted successfully!");
        return res.data;
    } catch (err) {
        console.log("SUBMIT_HOMEWORK ERROR:", err);
        toast.error(getErrorMessage(err));
    } finally {
        toast.dismiss(toastId);
    }
};


// ================== GET RESULT ==================
export const getHomeworkResult = async (homeworkId, token) => {
    try {
        const url = HOMEWORK_API.GET_RESULT.replace(":homeworkId", homeworkId);

        const res = await apiConnector(
            "GET",
            url,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!res?.data?.success) {
            throw new Error("Failed to fetch result");
        }

        return res.data.data;
    } catch (err) {
        console.log("GET_RESULT ERROR:", err);
        toast.error(getErrorMessage(err));
    }
};

// ================== CHECK HOMEWORK ==================
export const checkHomework = async (homeworkId, token) => {
    const toastId = toast.loading("Fetching results...");

    try {
        const res = await apiConnector(
            "POST",
            `${HOMEWORK_API
                .CHECK_HOMEWORK_RESULT_TEACHER
                .replace(":homeworkId",
                    homeworkId)}`,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!res?.data?.success) {
            throw new Error("Failed to fetch homework results");
        }

        toast.success("Results fetched successfully!");
        return res.data;

    } catch (err) {
        console.log("CHECK_HOMEWORK ERROR:", err);
        toast.error(getErrorMessage(err));
    } finally {
        toast.dismiss(toastId);
    }
};

// ================== GET SUBMISSIONS ==================
