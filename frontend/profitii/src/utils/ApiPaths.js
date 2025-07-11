export const BASE_URL = "http://localhost:8000";

// utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        LOGOUT: "/api/v1/auth/logout",
        GET_USER_INFO: "/api/v1/auth/getuser",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
    },
    INCOME: {
        GET_INCOMES: "/api/v1/income/get",
        ADD_INCOME: "/api/v1/income/add",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
    },
    EXPENSE: {
        GET_EXPENSES: "/api/v1/expense/get",
        ADD_EXPENSE: "/api/v1/expense/add",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    },
}