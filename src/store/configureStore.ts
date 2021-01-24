import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer"

export default function config(){
    return configureStore({
        reducer
    })
}