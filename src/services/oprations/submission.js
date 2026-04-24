import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { SUBMISSION_API } from "../allEndpoints";

const getErrorMessage = (err, fallback = "Something went wrong") =>
    err?.response?.data?.message || err?.message || fallback;

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

// ─── Submit Homework ───────────────────────────────────────────────
export const submitHomework = async (data, token) => {
    const toastId = toast.loading("Submitting homework...");
    try {
        const res = await apiConnector(
            "POST",
            SUBMISSION_API.SUBMIT_HOMEWORK,
            data,
            authHeader(token)
        );
        toast.success(res.data?.message || "Homework submitted!", { id: toastId });
        return res.data;
    } catch (err) {
        toast.error(getErrorMessage(err), { id: toastId });
        return null;
    }
};

// ─── Get All Submissions (Teacher/Admin) ───────────────────────────
export const getAllSubmissions = async (token) => {
    const toastId = toast.loading("Fetching submissions...");
    try {
        const res = await apiConnector(
            "GET",
            SUBMISSION_API.GET_ALL_SUBMISSIONS,
            null,
            authHeader(token)
        );
        toast.dismiss(toastId);
        return res.data;
    } catch (err) {
        toast.error(getErrorMessage(err), { id: toastId });
        return null;
    }
};

// ─── Create / Update Result (Teacher) ─────────────────────────────
export const createResult = async (homeworkId, resultData, token) => {
    const toastId = toast.loading("Saving result...");
    try {
        const url = SUBMISSION_API.CREATE_RESULT.replace(":homeworkId", homeworkId);
        const res = await apiConnector(
            "POST",
            url,
            resultData,
            authHeader(token)
        );
        toast.success(res.data?.message || "Result saved!", { id: toastId });
        return res.data;
    } catch (err) {
        toast.error(getErrorMessage(err), { id: toastId });
        return null;
    }
};

// ─── Get Student Result ────────────────────────────────────────────
export const getStudentResult = async (homeworkId, token) => {
    const toastId = toast.loading("Fetching result...");
    try {
        const url = SUBMISSION_API.GET_STUDENT_RESULT.replace(":homeworkId", homeworkId);
        const res = await apiConnector(
            "GET",
            url,
            null,
            authHeader(token)
        );
        toast.dismiss(toastId);
        return res.data;
    } catch (err) {
        toast.error(getErrorMessage(err), { id: toastId });
        return null;
    }
};