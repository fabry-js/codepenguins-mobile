import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../actions/apiActions";

type SliceState = {
  userInfo: Array<{}>;
  lastLogin: number;
  lastLogout: number;
  loading: boolean;
};

const slice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    loading: false,
    lastLogin: 0,
    lastLogout: 0,
  } as SliceState,
  reducers: {
    loginRequested: (state) => {
      state.loading = true;
    },
    loginDone: (state, action: PayloadAction<any>) => {
      state.userInfo.push(action.payload);
      state.lastLogin = Date.now();
    },
    loginFailed: (state) => {
      state.loading = true;
    },
    logoutDone: (state) => {
      state.userInfo = [];
      state.lastLogout = Date.now();
    },
  },
});

const { loginRequested, loginDone, loginFailed, logoutDone } = slice.actions;

export default slice.reducer;

// Action Creators

const url = "/auth";

export const loadUser = (
  dispatch: (arg0: { payload: undefined; type: string }) => any,
  getState: () => {
    (): any;
    new (): any;
    rootReducer: { (): any; new (): any; user: { lastLogin: any } };
  }
) => {
  const { lastLogin } = getState().rootReducer.user;

  /**
   * @todo fai in modo che non venga fatto un re-fetch dello user se
   * la diff di tempo in minuti è minore o uguale a 2/3 minuti (il login
   * può essere rifatto nel momento in cui c'è, ad esempio, un Network Crash
   * lato client che resetta lo state dello user corrente, aka userInfo = []).
   *
   * Usa moment().diff() btw.
   */

  return dispatch(
    apiCallBegan({
      url,
      onStart: loginRequested.type,
      onSuccess: loginDone.type,
      onError: loginFailed.type,
    })
  );
};

export const login = (userInfos: any) => {

  apiCallBegan({
    url,
    method: "post",
    data: userInfos,
    onStart: loginRequested.type,
    onSuccess: loginDone.type,
    onError: loginFailed.type,
  });
};

export const logout = (dispatch: any) => {
  return dispatch(logoutDone());
};
