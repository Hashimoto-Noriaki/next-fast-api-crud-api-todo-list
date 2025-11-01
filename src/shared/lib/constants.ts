/**
 * アプリケーション全体で使用する定数
 */
export const APP_NAME = "Todo App";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TODOS: "/todos",
  TODOS_NEW: "/todos/new",
  PROFILE: "/profile",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  TODOS: {
    LIST: "/todos",
    CREATE: "/todos",
    DETAIL: (id: string) => `/todos/${id}`,
    UPDATE: (id: string) => `/todos/${id}`,
    DELETE: (id: string) => `/todos/${id}`,
  },
  USERS: {
    PROFILE: "/users/me",
    UPDATE: "/users/me",
    DELETE: "/users/me",
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;
