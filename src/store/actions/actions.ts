import { createAction } from "@reduxjs/toolkit";

export const userTriedToLoad = createAction<any>('USER_TRIED_TO_FETCH')
export const userLoadFailed = createAction<any>('USER_TRIED_TO_LOGIN_FAILED')
export const insertUser = createAction<any>('USER_SET_OR_READ')