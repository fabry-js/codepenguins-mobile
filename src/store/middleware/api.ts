import axios from "axios";
import * as actions from "../actions/apiActions";

const apiReducer = ({ dispatch }: any) => (next: any) => async (action: any) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onSuccess, onError, onStart } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: "<url>",
      url,
      method,
      data,
    });
    // @ts-ignore -> Expected 0 arguments, but got 1.ts(2554)
    dispatch(actions.apiCallSuccess(response.data));

    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (err) {
      
    // @ts-ignore -> Expected 0 arguments, but got 1.ts(2554)
    dispatch(actions.apiCallFailed(err.message));

    if (onError) dispatch({ type: onError, payload: err });
  }
};

export type UserState = ReturnType<typeof apiReducer>;

export default apiReducer;
