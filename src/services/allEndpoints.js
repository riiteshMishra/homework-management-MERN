

export const AUTH_API = {
    REGISTER: "/auth/sign-up",
    LOGIN: "/auth/log-in",
    USER_DETAILS: "/auth/get-user-details",
    ALL_STUDENTS: "/auth/students",
}

export const HOMEWORK_API = {
    CREATE_HOMEWORK: "/homework/create",
    UPDATE_HOMEWORK: "/homework/update",
    DELETE_HOMEWORK: "/homework/delete/:homeworkId",
    ALL_HOMEWORKS: "/homework/homeworks",
    HOMEWORK_BY_ID: "/homework/:homeworkId",
    CHECK_HOMEWORK_RESULT_TEACHER: "/homework/create-result",
    GET_SUBMISSIONS: "/homework/submissions",

    // submit api
    SUBMIT_HOMEWORK: "/homework/submit",
    GET_RESULT: "/homework/:homeworkId",
}

export const SUBMISSION_API = {
    SUBMIT_HOMEWORK: "/submission/submit",
    GET_ALL_SUBMISSIONS: "/submission/all-submissions",
    CREATE_RESULT: "/submission/create-result/:homeworkId",
    GET_STUDENT_RESULT: "/submission/result/:homeworkId"
}

export const TEACHER_API = {
    BAN_STUDENT: "/teacher/ban-student",
    DELETE_STUDENT: "/teacher/delete-students",
}