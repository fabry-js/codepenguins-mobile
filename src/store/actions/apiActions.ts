import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction<any>('API_CALL_BEGAN')
export const apiCallSuccess = createAction<any>('API_CALL_SUCCESS')
export const apiCallFailed = createAction<any>('API_CALL_FAILED')