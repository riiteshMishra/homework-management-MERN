import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { TEACHER_API } from "../allEndpoints";



// getErrorMessage
const getErrorMessage = (err, fallback = "Something went wrong") =>
    err?.response?.data?.message || err?.message || fallback;


// ================= BAN / UNBAN STUDENT =================
export const banUnbanStudent = async (token, studentId,) => {
    try {
        const res = await apiConnector(
            "PATCH",
            `${TEACHER_API.BAN_STUDENT}/${studentId}`,
            null,
            { Authorization: `Bearer ${token}` }
        );

        toast.success(res.data.message);
        return res.data;
    } catch (err) {
        toast.error(getErrorMessage(err, "Ban action failed"));
        return null;
    }
};

// ================= DELETE STUDENT =================
export const deleteStudent = async (token, students) => {
    try {
        const res = await apiConnector(
            "DELETE",
            TEACHER_API.DELETE_STUDENT,
            students,
            { Authorization: `Bearer ${token}` }
        );
        toast.success(res.data.message || "Student Deleted");
        return res.data;
    } catch (err) {
        toast.error(err?.response?.data?.message || "Delete action failed");
        return null;
    }
};