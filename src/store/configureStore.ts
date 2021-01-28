import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer"
import firebaseMiddleware from "./middleware/firebaseMiddleware"
export default function config(){
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            firebaseMiddleware
        ]
    })
}