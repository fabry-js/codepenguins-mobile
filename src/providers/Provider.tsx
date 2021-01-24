import React from "react";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import configureStore from "../store/configureStore"

import App from "../App";
import Auth from "../auth/Auth";
import { auth } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface ProviderProps {}

const store = configureStore()

export const Provider: React.FC<ProviderProps> = () => {
  const [ user ] = useAuthState(auth);

  return <ReduxProvider store={store}>{user ? <Auth /> : <App />}</ReduxProvider>;
};
