import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/rootReducer";
import loggerMiddleware from "./middleware/logger";
import apiMiddleware from "./middleware/api";


export default function configuration() {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
          .prepend(
              loggerMiddleware,
              apiMiddleware
          )
  });
}
