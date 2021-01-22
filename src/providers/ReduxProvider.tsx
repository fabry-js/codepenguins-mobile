import React from "react";
import { Provider } from "react-redux";
import configureStore from "../store/configureStore";

const store = configureStore()

interface ReduxProviderProps {}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {

  return (
    <Provider store={store}>
      { children }
    </Provider>
  );
};
