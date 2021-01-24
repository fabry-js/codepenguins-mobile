import { createAction } from "@reduxjs/toolkit";

export const userTriedToLoad = createAction('USER_TRIED_TO_FETCH')
export const userLoadFailed = createAction('USER_TRIED_TO_LOGIN_FAILED')
export const insertUser = createAction('USER_SET_OR_READ')